import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import '../ErrorPage/ErrorPage.css'
export default class ErrorPage extends Component {

    constructor(props) {
        super(props)
        const errMessage = this.props.message;
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
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <img
                            alt="Error Logo"
                            src="./images/oops-real.png"
                            className="img-fluid"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center mt-5'><h2>{message}</h2></Col>
                </Row>
                <Row>
                    <Col className='text-center mt-2'><h3>Go back to the home <a href="/">page</a></h3></Col>
                </Row>
            </Container>
        );
    }
}