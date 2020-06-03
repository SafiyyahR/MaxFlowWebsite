import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import '../ErrorPage/ErrorPage.css'
import { Helmet } from 'react-helmet'
export default class ErrorPage extends Component {
    title = "Error | MX flow";
    constructor(props) {
        super(props)
        var errMessage = this.props.message;
        if (errMessage == null) {
            errMessage = "404 Page Not Found";
        }
        console.log(errMessage);
        this.state = {
            message: errMessage
        }
    }
    render() {
        const { message } = this.state;
        return (
            <Container className="pt-5">
                <Helmet>
                    <title>{this.title}</title>
                    <link rel="icon" href="images/logo.png" sizes="16x16"></link>
                </Helmet>
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
                    <Col lg={{ span: 8, offset: 2 }} className='text-center mt-5'><h2>{message}</h2></Col>
                </Row>
                <Row>
                    <Col lg={{ span: 8, offset: 2 }} className='text-center mt-2'><h3>Go back to the home <a href="/">page</a></h3></Col>
                </Row>
            </Container>
        );
    }
}