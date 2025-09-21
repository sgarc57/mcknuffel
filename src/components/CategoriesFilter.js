import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';

const CategoriesFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  // If no categories are provided, show a loading state or message
  if (!categories || categories.length === 0) {
    return (
      <div className="mb-4">
        <h5>Categories</h5>
        <div className="text-muted">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h5>Categories</h5>
      <ListGroup>
        <ListGroup.Item 
          action 
          active={!selectedCategory}
          onClick={() => onSelectCategory(null)}
          className="d-flex justify-content-between align-items-center"
        >
          All Products
          <Badge bg="secondary" pill>
            {categories.reduce((sum, cat) => sum + (cat.count || 0), 0)}
          </Badge>
        </ListGroup.Item>
        
        {categories.map((category) => (
          <ListGroup.Item 
            key={category.id || category.name}
            action 
            active={selectedCategory === category.id}
            onClick={() => onSelectCategory(category.id)}
            className="d-flex justify-content-between align-items-center"
          >
            {category.name}
            {category.count && (
              <Badge bg={selectedCategory === category.id ? 'light' : 'secondary'} text={selectedCategory === category.id ? 'dark' : 'white'} pill>
                {category.count}
              </Badge>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CategoriesFilter;
