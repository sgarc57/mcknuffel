import React, { useState } from 'react';
import { Card, Form, Button, Accordion } from 'react-bootstrap';
import { Sliders } from 'react-bootstrap-icons';

const FilterWidget = ({ 
  categories = [], 
  priceRange = { min: 0, max: 1000 },
  onFilterChange,
  onResetFilters
}) => {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { ...priceRange },
    sortBy: 'featured',
    inStockOnly: false,
    onSaleOnly: false
  });

  const handleCategoryChange = (categoryId) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
      
    const newFilters = {
      ...filters,
      categories: newCategories
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const newPriceRange = {
      ...filters.priceRange,
      [name]: parseInt(value, 10)
    };
    const newFilters = {
      ...filters,
      priceRange: newPriceRange
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const newFilters = {
      ...filters,
      [name]: checked
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    const newFilters = {
      ...filters,
      sortBy
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      categories: [],
      priceRange: { ...priceRange },
      sortBy: 'featured',
      inStockOnly: false,
      onSaleOnly: false
    };
    setFilters(defaultFilters);
    onResetFilters();
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-white border-bottom-0 d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <Sliders className="me-2" />
          Filters
        </h5>
        <Button 
          variant="link" 
          size="sm" 
          onClick={handleResetFilters}
          className="p-0"
        >
          Reset All
        </Button>
      </Card.Header>
      <Card.Body>
        <Accordion defaultActiveKey="0" flush>
          {/* Categories */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>Categories</Accordion.Header>
            <Accordion.Body>
              <div className="category-list" style={{ maxHeight: '300px', overflowY: 'auto', padding: '0 0.25rem' }}>
                {categories.map(category => (
                  <div key={category.id} className="d-flex align-items-center mb-1">
                    <Form.Check
                      type="checkbox"
                      id={`cat-${category.id}`}
                      checked={filters.categories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                      className="me-2"
                      style={{ flexShrink: 0 }}
                    />
                    <Form.Label 
                      htmlFor={`cat-${category.id}`}
                      className="mb-0 flex-grow-1"
                      style={{
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        backgroundColor: filters.categories.includes(category.id) ? '#f8f9fa' : 'transparent',
                        width: '100%',
                        margin: 0
                      }}
                    >
                      {`${category.niceName} (${category.count})`}
                    </Form.Label>
                  </div>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          {/* Price Range */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>Price Range</Accordion.Header>
            <Accordion.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>${filters.priceRange.min}</span>
                  <span>${filters.priceRange.max}</span>
                </div>
                <div className="px-2">
                  <Form.Range 
                    min={priceRange.min} 
                    max={priceRange.max} 
                    value={filters.priceRange.max}
                    onChange={handlePriceChange}
                    name="max"
                    className="mb-3"
                  />
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          {/* Availability */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>Availability</Accordion.Header>
            <Accordion.Body className="p-2">
              <Form.Check
                type="switch"
                id="in-stock"
                label="In Stock Only"
                name="inStockOnly"
                checked={filters.inStockOnly}
                onChange={handleCheckboxChange}
                className="mb-2"
              />
              <Form.Check
                type="switch"
                id="on-sale"
                label="On Sale"
                name="onSaleOnly"
                checked={filters.onSaleOnly}
                onChange={handleCheckboxChange}
              />
            </Accordion.Body>
          </Accordion.Item>

          {/* Sort By */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>Sort By</Accordion.Header>
            <Accordion.Body className="p-2">
              <Form.Select 
                value={filters.sortBy}
                onChange={handleSortChange}
                size="sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="bestselling">Best Selling</option>
              </Form.Select>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default FilterWidget;
