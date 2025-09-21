import React from 'react';
import { Modal } from 'react-bootstrap';
import { format } from 'date-fns';

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ImageModal = ({ 
  show, 
  onHide, 
  image: selectedImage,
  title = 'Product Image'
}) => {
  if (!selectedImage) return null;

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      size="lg"
      centered
      className="image-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{selectedImage.title || title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
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
        {selectedImage.description && (
          <p className="mt-3">{selectedImage.description}</p>
        )}
        <div className="mt-2 text-muted">
          <small>
            {selectedImage.fileType && (
              <span className="me-2">Type: {selectedImage.fileType.toUpperCase()}</span>
            )}
            {selectedImage.fileSize && (
              <span className="me-2">• Size: {formatFileSize(selectedImage.fileSize)}</span>
            )}
            {selectedImage.uploadedAt && (
              <span>• Uploaded: {format(new Date(selectedImage.uploadedAt), 'MMM d, yyyy')}</span>
            )}
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
