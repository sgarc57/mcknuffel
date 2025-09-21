import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Basket.css';

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load basket items from localStorage on component mount
  useEffect(() => {
    const loadBasket = async () => {
      try {
        // TODO: Replace with actual API call to fetch basket
        const storedBasket = localStorage.getItem('basket');
        setBasket(storedBasket ? JSON.parse(storedBasket) : []);
      } catch (err) {
        setError('Failed to load your basket. Please try again.');
        console.error('Basket load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBasket();
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedBasket = basket.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setBasket(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
  };

  const removeItem = (id) => {
    const updatedBasket = basket.filter(item => item.id !== id);
    setBasket(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
  };

  const calculateTotal = () => {
    return basket.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = () => {
    // TODO: Implement checkout process
    console.log('Proceeding to checkout with items:', basket);
  };

  if (loading) {
    return <div className="text-center mt-5">Loading your basket...</div>;
  }

  return (
    <Container className="basket-container py-5">
      <h2 className="mb-4">Your Shopping Basket</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {basket.length === 0 ? (
        <Card className="text-center p-5">
          <Card.Body>
            <h4>Your basket is empty</h4>
            <p className="text-muted">Browse our products and add some items to your basket</p>
            <Button as={Link} to="/" variant="primary">
              Continue Shopping
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          <Col lg={8}>
            <ListGroup>
              {basket.map((item) => (
                <ListGroup.Item key={item.id} className="mb-3">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <img 
                        src={item.image || 'https://via.placeholder.com/80'} 
                        alt={item.name} 
                        className="img-fluid"
                        style={{ maxHeight: '80px' }}
                      />
                    </Col>
                    <Col md={4}>
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="text-muted mb-0">${item.price.toFixed(2)}</p>
                    </Col>
                    <Col md={3} className="d-flex align-items-center">
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </Col>
                    <Col md={2} className="text-end">
                      <h5 className="mb-0">${(item.price * item.quantity).toFixed(2)}</h5>
                    </Col>
                    <Col md={1} className="text-end">
                      <Button 
                        variant="link" 
                        className="text-danger"
                        onClick={() => removeItem(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col lg={4}>
            <Card className="sticky-top" style={{ top: '20px' }}>
              <Card.Body>
                <h5 className="mb-4">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({basket.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total</strong>
                  <strong>${calculateTotal()}</strong>
                </div>
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-100"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                <div className="text-center mt-3">
                  <Link to="/" className="text-muted">Continue Shopping</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Basket;
