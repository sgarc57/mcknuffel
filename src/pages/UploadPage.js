import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_ENDPOINTS } from '../config';


const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage({ text: 'Please select a file to upload', type: 'danger' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);
    if (description) formData.append('description', description);
    if (category) formData.append('category', category);

    try {
      setIsUploading(true);
      setMessage({ text: 'Uploading...', type: 'info' });
      const response = await axios.post(API_ENDPOINTS.UPLOAD, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
        withCredentials: true
      });
      
      setMessage({ 
        text: 'Upload successful!', 
        type: 'success' 
      });
      
      // Reset form
      setFile(null);
      setTitle('');
      setDescription('');
      setCategory('');
      document.getElementById('file-upload').value = '';
    } catch (error) {
      console.error('Upload failed:', error);
      
      let errorMessage = 'Upload failed. ';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage += `Server responded with status ${error.response.status}: `;
        
        if (error.response.data) {
          // Try to get detailed error message from response
          if (typeof error.response.data === 'string') {
            errorMessage += error.response.data;
          } else if (error.response.data.message) {
            errorMessage += error.response.data.message;
          } else if (error.response.data.error) {
            errorMessage += error.response.data.error;
          } else {
            errorMessage += JSON.stringify(error.response.data);
          }
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage += 'No response received from server. Please check your connection.';
      } else if (error.message) {
        // Something happened in setting up the request that triggered an Error
        errorMessage += error.message;
      } else {
        errorMessage += 'An unknown error occurred.';
      }
      
      setMessage({ 
        text: errorMessage,
        type: 'danger' 
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Upload Image</h2>
              
              {message.text && (
                <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
                  {message.text}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setMessage({ text: '', type: '' })}
                    aria-label="Close"
                  ></button>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="file-upload" className="form-label">
                    Choose Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isUploading}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isUploading}
                    placeholder="Enter a title for the image"
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description (Optional)
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isUploading}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Category (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={isUploading}
                    placeholder="e.g., animal, landscape, portrait"
                  />
                </div>
                
                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Uploading...
                      </>
                    ) : (
                      'Upload Image'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
