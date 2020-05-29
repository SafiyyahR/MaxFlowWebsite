import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import '../NavBar/NavBar.css'
//4c96d7
export default class NavBar extends Component {

    render() {
        return (
            <Navbar expand="lg" className="navbar-background" sticky="top">
                <Navbar.Brand href="/" className="align-items-center">
                    <img
                        alt="Website logo"
                        src="./images/logo.png"
                        width="auto"
                        height="40"
                        className="d-inline-block align-top"
                    />
                    <span className="navbar-title">
                        <span id="navbar-span-mx">MX&nbsp;</span>
                        <span id="navbar-span-flow">flow</span>
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-responsive" />
                <Navbar.Collapse id="navbar-responsive">
                    <Nav className="ml-auto align-items-left">
                        <NavLink className="custom-link" exact activeClassName="active" to="/">Home</NavLink>
                        <NavLink className="custom-link" exact activeClassName="active" to="/maxflow">Find Max Flow</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
