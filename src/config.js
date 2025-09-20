// Base API configuration
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

// Full API endpoints
export const API_ENDPOINTS = {
  UPLOAD: `${API_BASE_URL}/api/images/upload`,
  ALL_IMAGES: `${API_BASE_URL}/api/images`,
  // Add other API endpoints here as needed
};
