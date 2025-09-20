import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import { format } from 'date-fns';
import { Modal } from 'react-bootstrap';
import './Home.css'; // We'll create this file for custom styles

// Home page
export function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.ALL_IMAGES);
        setProducts(response.data);
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

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
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

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Welcome to the Toy Store!</h1>
      
      {products.length === 0 ? (
        <div className="alert alert-info">No products found. Start by uploading some images!</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {products.map((product) => (
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
                  <h5 className="card-title">{product.name || 'Untitled'}</h5>
                  {product.description && (
                    <p className="card-text">{product.description}</p>
                  )}
                  <div className="mt-2">
                    {product.category && (
                      <span className="badge bg-primary me-2">
                        {product.category.replace('_', ' ')}
                      </span>
                    )}
                    {product.type && (
                      <span className="badge bg-secondary me-2">
                        {product.type.split('/')[1]?.toUpperCase() || product.type}
                      </span>
                    )}
                    {product.size && (
                      <span className="badge bg-info text-dark">
                        {formatFileSize(product.size)}
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
      
      {/* Image Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        className="image-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage?.name || 'Product Image'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedImage && (
            <img 
              src={selectedImage.downloadUrl} 
              alt={selectedImage.name || 'Product image'}
              className="img-fluid"
              style={{ maxHeight: '70vh', maxWidth: '100%', objectFit: 'contain' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
              }}
            />
          )}
          {selectedImage?.description && (
            <p className="mt-3">{selectedImage.description}</p>
          )}
          <div className="mt-2 text-muted">
            <small>
              {selectedImage?.fileType && (
                <span className="me-2">Type: {selectedImage.fileType.toUpperCase()}</span>
              )}
              {selectedImage?.fileSize && (
                <span className="me-2">• Size: {formatFileSize(selectedImage.fileSize)}</span>
              )}
              {selectedImage?.uploadedAt && (
                <span>• Uploaded: {format(new Date(selectedImage.uploadedAt), 'MMM d, yyyy')}</span>
              )}
            </small>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default HomePage;
