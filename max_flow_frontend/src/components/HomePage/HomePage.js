import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import '../HomePage/HomePage.css'
import '../../index.css'
export default class HomePage extends Component {
    title = "Home | MX flow";
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className="pt-5 main-container">
                <Helmet>
                    <title>{this.title}</title>
                    <link rel="icon" href="images/logo.png" sizes="16x16"></link>
                </Helmet>
                <Row>
                    <Col lg={{ span: 8, offset: 2 }}>
                        <h2>What is Max Flow?</h2>
                        <p>The maximum quantity of flow that passes from the source to the sink of a graph.</p>
                        <h2>What is Min-Cut?</h2>
                        <p>Find s-t cuts and then decide which one is the minimum using the summation of the capacities of the edges chosen in each cut.</p>
                        <h2>Pseudo code</h2>
                        <h3>Calculate Max Flow - Pseudocode</h3>
                        <Row>
                            <ol className="pseudocode">
                                <li><b>.</b> &nbsp;SET max_flow TO 0</li>
                                <li><b>.</b> &nbsp;WHILE path FROM source to sink exists (use BFS or DFS)</li>
                                <ol>
                                    <li><b>.</b> &nbsp;FIND minimum flow in path FOUND</li>
                                    <li><b>.</b> &nbsp;ADD minimum flow to max_flow</li>
                                </ol>
                                <li><b>.</b> &nbsp;RETURN max_flow</li>
                            </ol>
                        </Row>
                        <h2>References</h2></Col>
                </Row>
            </Container>
        );
    }
}