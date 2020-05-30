import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import '../HomePage/HomePage.css'
import '../../index.css'
export default class HomePage extends Component {

    render() {
        return (
            <Container className="pt-5 main-container">
                <Row>
                    <Col>
                        <h2>What is Max Flow?</h2>
                        <h2>What is Min-Cut?</h2>
                        <h2>Implementation</h2>
                        <h2>References</h2></Col>
                </Row>
            </Container>
        );
    }
}