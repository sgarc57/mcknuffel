import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

// Custom NavLink component with active state styling
const CustomNavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Nav.Link 
      as={Link} 
      to={to} 
      className={`position-relative px-3 mx-1 ${isActive ? 'active' : ''}`}
      style={{
        paddingBottom: '0.5rem',
        color: isActive ? '#000' : 'rgba(0, 0, 0, 0.55)',
        fontWeight: isActive ? '500' : '400',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      {children}
      {isActive && (
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '3px',
            backgroundColor: '#000',
            borderRadius: '3px 3px 0 0',
          }}
        />
      )}
    </Nav.Link>
  );
};

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // This would come from your auth context or Redux store
  const isAuthenticated = false; // Replace with actual auth state
  const basketItemCount = 0; // Replace with actual basket count from your state
  
  // Add padding to the body to account for fixed navbar
  React.useEffect(() => {
    document.body.style.paddingTop = '56px'; // Height of the navbar
    return () => {
      document.body.style.paddingTop = '0';
    };
  }, []);

  return (
    <Navbar 
      bg="light" 
      expand="lg" 
      className="shadow-sm fixed-top"
      style={{
        zIndex: 1030,
        boxShadow: '0 2px 4px rgba(0,0,0,.1)'
      }}
    >
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
            <CustomNavLink to="/home">
              Home
            </CustomNavLink>
            <CustomNavLink to="/basket">
              <div className="d-flex align-items-center">
                Basket
                {basketItemCount > 0 && (
                  <Badge bg="danger" className="ms-1" pill>
                    {basketItemCount}
                  </Badge>
                )}
              </div>
            </CustomNavLink>
            <CustomNavLink to="/dashboard">
              Dashboard
            </CustomNavLink>
          </Nav>
          
          <Nav>
            {isAuthenticated ? (
              <NavDropdown 
                title={
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person-circle me-1"></i>
                    <span>Account</span>
                  </div>
                } 
                id="basic-nav-dropdown" 
                align="end"
                className={location.pathname === '/profile' || location.pathname === '/orders' ? 'active-nav-dropdown' : ''}
              >
                <NavDropdown.Item as={Link} to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                  <i className="bi bi-person me-2"></i>Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders" className={location.pathname === '/orders' ? 'active' : ''}>
                  <i className="bi bi-box-seam me-2"></i>My Orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => { /* handle logout */ }}>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <CustomNavLink to="/login">
                  <i className="bi bi-box-arrow-in-right me-1"></i>Login
                </CustomNavLink>
                <Nav.Link 
                  as={Link} 
                  to="/signup" 
                  className={`ms-2 ${location.pathname === '/signup' ? 'active' : ''}`}
                  style={{
                    borderRadius: '5px',
                    fontWeight: location.pathname === '/signup' ? '500' : '400',
                    border: '1px solid #0d6efd',
                    color: location.pathname === '/signup' ? '#fff' : '#0d6efd',
                    backgroundColor: location.pathname === '/signup' ? '#0d6efd' : 'transparent',
                    transition: 'all 0.2s ease-in-out',
                    padding: '0.375rem 0.75rem',
                    textAlign: 'center',
                    minWidth: '85px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <i className="bi bi-person-plus me-1"></i>Sign Up
                </Nav.Link>
              </>
            )}
            <div className="position-relative ms-3">
              <CustomNavLink to="/basket" className="d-flex align-items-center">
                <i className="bi bi-cart3 fs-5"></i>
                {basketItemCount > 0 && (
                  <span 
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                    style={{
                      fontSize: '0.6rem',
                      transform: 'translate(-50%, -50%)',
                      top: '0',
                      left: '100%'
                    }}
                  >
                    {basketItemCount}
                  </span>
                )}
              </CustomNavLink>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
