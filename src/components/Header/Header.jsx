import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="p-3">
      <Navbar.Brand href="/">MyLogo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/services">Services</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          
          <Link to={"/signin"}>
         Sign In
          </Link>
          <Nav.Link href="/contact">Sign Up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header