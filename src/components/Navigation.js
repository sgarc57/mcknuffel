import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // This would come from your auth context or Redux store
  const isAuthenticated = false; // Replace with actual auth state
  const basketItemCount = 0; // Replace with actual basket count from your state

  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="McKnuffel Logo"
          />
          McKnuffel
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" active={location.pathname === '/home'}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/basket" active={location.pathname === '/basket'}>
              Basket
              {basketItemCount > 0 && (
                <Badge bg="danger" className="ms-1" pill>
                  {basketItemCount}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard" active={location.pathname === '/dashboard'}>
              Dashboard
            </Nav.Link>
          </Nav>
          
          <Nav>
            {isAuthenticated ? (
              <NavDropdown title="My Account" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders">My Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => { /* handle logout */ }}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" active={location.pathname === '/login'}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" active={location.pathname === '/signup'} className="btn btn-outline-primary ms-2">
                  Sign Up
                </Nav.Link>
              </>
            )}
            <Nav.Link 
              as={Link} 
              to="/basket" 
              className="d-flex align-items-center ms-3"
              title="Basket"
            >
              <i className="bi bi-cart3 fs-5"></i>
              {basketItemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6rem'}}>
                  {basketItemCount}
                </span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
