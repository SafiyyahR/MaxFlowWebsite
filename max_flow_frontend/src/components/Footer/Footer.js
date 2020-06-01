import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import '../Footer/Footer.css'
export default class Footer extends Component {

    render() {
        return (
            <div style={{ backgroundColor: "black", color: "white" }} className=" fixed-bottom footer-copyright text-center py-3 ">© 2020 Copyright:&nbsp;
                <a style={{ backgroundColor: "black", color: "white" }} href="https://www.linkedin.com/in/safiyyah-r-408652132/">Safiyyah Thur Rahman</a>
            </div>
        );
    }
}