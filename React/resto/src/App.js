import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import Home from "./components/Home"
import RestraurantCreate from "./components/RestraurantCreate"
import RestraurantDetail from "./components/RestraurantDetail"
import RestraurantSearch from "./components/RestraurantSearch"
import RestraurantList from "./components/RestraurantList"
import { RestraurantUpdate } from './components/RestraurantUpdate';
import { Navbar, Form, Nav, Container, NavDropdown, InputGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 
  return (
    <div className="App">
      <Router>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>

            <Navbar.Brand href="#home">Restraurant</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home"><Link to="/">Home</Link></Nav.Link>
                <Nav.Link href="#link"><Link to="/list">List</Link></Nav.Link>
                <Nav.Link href="#link"><Link to="/create">Create</Link></Nav.Link>
                <Nav.Link href="#link"><Link to="/search">Search</Link></Nav.Link>
                <Nav.Link href="#link"><Link to="/detail">Detail</Link></Nav.Link>
                <Nav.Link href="#link"><Link to="/update">Update</Link></Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/List" element={<RestraurantList />} />
          <Route path="/Create" element={<RestraurantCreate />} />
          <Route path="/Search" element={<RestraurantSearch />} />
          <Route path="/Detail" element={<RestraurantDetail />} />
          <Route path="/update" element={<RestraurantUpdate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
