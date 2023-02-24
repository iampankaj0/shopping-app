import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const { cartItem } = useSelector((state) => state.cart);

  return (
    <>
      <Navbar
        className="main__header"
        bg="dark"
        expand="lg"
        variant="dark"
        collapseOnSelect
      >
        <Container>
          <Link to="/">
            <Navbar.Brand href="#home">online shop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link className="navbar_cart_badge">
                  <i className="fas fa-shopping-cart"></i> cart
                  {cartItem.length > 0 && <span>{cartItem.length}</span>}
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> sign in
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
