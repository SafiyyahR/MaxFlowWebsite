import React, { Component } from 'react'
import { Nav, NavItem, Navbar } from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalculator, faHome } from '@fortawesome/free-solid-svg-icons'
import './navbar.css'
export default class NavBar extends Component {

    render() {
        return (
            <Navbar expand="lg" className="navbar-background shadow" sticky="top">
                <Navbar.Brand href="/" className=" ml-2">
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
                <Navbar.Toggle aria-controls="navbar-responsive" className="mr-2" />
                <Navbar.Collapse id="navbar-responsive">
                    <Nav className="align-items-center justify-content-end navbar-custom-collapse">
                        <NavLink className="custom-link" to="/" exact="true" activeClassName="active">
                            <NavItem className="p-3 custom-nav-item text-center" ><FontAwesomeIcon className="custom-link-icon" icon={faHome} />Home</NavItem>
                        </NavLink>
                        <NavLink className="custom-link" to="/maxflow" activeClassName="active">
                            <NavItem className="p-3 custom-nav-item text-center" ><FontAwesomeIcon className="custom-link-icon" icon={faCalculator} />Find Max Flow</NavItem>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
