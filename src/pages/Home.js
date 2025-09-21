import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import { format } from 'date-fns';
import ImageModal from '../components/ImageModal';
import FilterWidget from '../components/FilterWidget'; // ✅ make sure this exists
import { Button, Row, Col } from 'react-bootstrap';
import { Funnel, X } from 'lucide-react';
import './Home.css';

export function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);

  // All filters in one state
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    inStockOnly: false,
    onSaleOnly: false,
  });

  // Active filter count (for the "Filters (x)" button)
  const activeFilterCount = useMemo(() => {
    let count = filters.categories.length;
    if (filters.priceRange.max < 1000) count++;
    if (filters.inStockOnly) count++;
    if (filters.onSaleOnly) count++;
    return count;
  }, [filters]);

  // Build categories list from products
  useEffect(() => {
    if (products.length > 0) {
      // Use an object to store unique categories with both niceName and actualName
      const categoriesMap = {};
      
      // Collect all unique categories from products
      products.forEach(product => {
        if (product.category) {
          const actualName = product.category.trim();
          if (actualName) {
            // Create a nice display name (capitalized, with spaces instead of underscores)
            const niceName = actualName
              .replace(/_/g, ' ')
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ');
              
            // Initialize category if it doesn't exist
            if (!categoriesMap[actualName]) {
              categoriesMap[actualName] = {
                actualName,
                niceName,
                id: niceName.toLowerCase().replace(/\s+/g, '-'),
                count: 0
              };
            }
            // Increment count for this category
            categoriesMap[actualName].count++;
          }
        }
      });

      // Convert to array and sort by niceName
      const categoryList = Object.values(categoriesMap).sort((a, b) => 
        a.niceName.localeCompare(b.niceName)
      );
      
      setCategories(categoryList);
    } else {
      setCategories([]);
    }
  }, [products]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.ALL_IMAGES);
        setProducts(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on active filters
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter - handle multiple categories
      if (filters.categories.length > 0) {
        const selectedCategories = categories.filter(cat => 
          filters.categories.includes(cat.id)
        );
        if (selectedCategories.length > 0 && 
            !selectedCategories.some(cat => p.category === cat.actualName)) {
          return false;
        }
      }

      // Price filter (assuming product.price exists)
      if (p.price && p.price > filters.priceRange.max) return false;

      // Stock filter
      if (filters.inStockOnly && !p.inStock) return false;

      // Sale filter
      if (filters.onSaleOnly && !p.onSale) return false;

      return true;
    });
  }, [products, filters]);

  // Handlers
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      categories: [],
      priceRange: { min: 0, max: 1000 },
      inStockOnly: false,
      onSaleOnly: false,
    });
  };

  const toggleFilters = () => {
    console.log('Toggle mobile filters');
  };

  // ------------------
  // RENDER
  // ------------------

  if (isLoading) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Our Products</h1>
        <Button
          variant="outline-secondary"
          onClick={toggleFilters}
          className="d-md-none"
        >
          <Funnel className="me-1" />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </Button>
      </div>

      <Row>
        {/* Sidebar filters */}
        <Col md={3} className="d-none d-md-block">
          <div className="sticky-top" style={{ top: '100px' }}>
            <FilterWidget
              categories={categories}
              priceRange={{ min: 0, max: 1000 }}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>
        </Col>

        {/* Products Grid */}
        <Col md={9}>
          {/* Active Filters Badges */}
          {(filters.category || filters.priceRange.max < 1000 || filters.inStockOnly || filters.onSaleOnly) && (
            <div className="mb-4">
              <div className="d-flex flex-wrap gap-2">
                {filters.categories.map(categoryId => {
                  const category = categories.find(c => c.id === categoryId);
                  return category ? (
                    <span key={categoryId} className="badge bg-light text-dark border d-flex align-items-center">
                      {category.niceName}
                      <Button
                        variant="link"
                        className="p-0 ms-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFilterChange({ 
                            ...filters, 
                            categories: filters.categories.filter(id => id !== categoryId) 
                          });
                        }}
                      >
                        <X size={14} />
                      </Button>
                    </span>
                  ) : null;
                })}
                {filters.priceRange.max < 1000 && (
                  <span className="badge bg-light text-dark border d-flex align-items-center">
                    Up to ${filters.priceRange.max}
                    <Button
                      variant="link"
                      className="p-0 ms-2"
                      onClick={() => handleFilterChange({ ...filters, priceRange: { min: 0, max: 1000 } })}
                    >
                      <X size={14} />
                    </Button>
                  </span>
                )}
                {filters.inStockOnly && (
                  <span className="badge bg-light text-dark border d-flex align-items-center">
                    In Stock Only
                    <Button
                      variant="link"
                      className="p-0 ms-2"
                      onClick={() => handleFilterChange({ ...filters, inStockOnly: false })}
                    >
                      <X size={14} />
                    </Button>
                  </span>
                )}
                {filters.onSaleOnly && (
                  <span className="badge bg-light text-dark border d-flex align-items-center">
                    On Sale
                    <Button
                      variant="link"
                      className="p-0 ms-2"
                      onClick={() => handleFilterChange({ ...filters, onSaleOnly: false })}
                    >
                      <X size={14} />
                    </Button>
                  </span>
                )}
                <Button
                  variant="link"
                  size="sm"
                  className="ms-2 p-0"
                  onClick={handleResetFilters}
                >
                  Clear all
                </Button>
              </div>
            </div>
          )}

          {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="alert alert-info">No products found. Start by uploading some images!</div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="col">
                  <div
                    className="card h-100 shadow-sm"
                    onClick={() => {
                      setSelectedImage(product);
                      setShowModal(true);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="image-container">
                      <img
                        src={product.downloadUrl}
                        alt={product.name || 'Product image'}
                        className="card-img-top img-fluid product-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                        }}
                      />
                      <div className="image-overlay">
                        <div className="overlay-content">
                          <span className="zoom-text">Click to view full image</span>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{product.title || 'Untitled'}</h5>
                      {product.description && (
                        <p className="card-text">{product.description}</p>
                      )}
                      <div className="mt-2">
                        {product.category && (
                          <span
                            className="badge bg-primary me-2"
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              const category = categories.find(c => c.actualName === product.category);
                              if (category) {
                                const newCategories = filters.categories.includes(category.id)
                                  ? filters.categories.filter(id => id !== category.id)
                                  : [...filters.categories, category.id];
                                handleFilterChange({ ...filters, categories: newCategories });
                              }
                            }}
                          >
                            {categories.find(c => c.actualName === product.category)?.niceName || product.category.replace('_', ' ')}
                          </span>
                        )}
                        {product.type && (
                          <span className="badge bg-secondary me-2">
                            {product.type.split('/')[1]?.toUpperCase() || product.type}
                          </span>
                        )}
                        {product.size && (
                          <span className="badge bg-info text-dark">
                            {product.size}
                          </span>
                        )}
                      </div>
                      {product.uploadedAt && (
                        <small className="text-muted d-block mt-2">
                          Uploaded: {format(new Date(product.uploadedAt), 'MMM d, yyyy')}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <h1 className="text-center mt-5">Ending Toy Store!</h1>
        </Col>
      </Row>

      {/* Reusable Image Modal */}
      <ImageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        image={selectedImage}
      />
    </div>
  );
}

export default HomePage;
