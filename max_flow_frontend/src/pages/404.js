import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import '../external-stylesheet.css'
import Title from '../components/title'
export default class Error extends Component {
    title = "Error | MX flow";
    render() {
        const { message } = this.props;
        const screenHeight = window.screen.height + "px";
        return (
            <Container style={{ minHeight: screenHeight }}  className="py-5">
                <Title title={this.title} />
                <Row>
                    <Col lg={{ span: 8, offset: 2 }}>
                        <img
                            alt="Error Logo"
                            src="./images/oops-real.png"
                            className="img-fluid"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg={{ span: 8, offset: 2 }} className='text-center mt-5'><h2>{message || "404 Page Not Found"}</h2></Col>
                </Row>
                <Row>
                    <Col lg={{ span: 8, offset: 2 }} className='text-center mt-2'><h3>Go back to the home <a href="/">page</a></h3></Col>
                </Row>
            </Container>
        );
    }
}