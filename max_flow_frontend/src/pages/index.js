import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import '../external-stylesheet.css'
import Title from '../components/title'
export default class Home extends Component {
    title = "Home | MX flow";
    render() {
        const screenHeight = window.screen.height + "px";
        return (
            <Container style={{ minHeight: screenHeight }} className="py-5">
                <Title title={this.title} />
                <Row>
                    <Col lg={{ span: 8, offset: 2 }}>
                        <h2>What is Max Flow?</h2>
                        <p>The maximum quantity of flow that passes from the source to the sink of a graph.</p>
                        <p>
                            The below picture is an example of a network. Here, there are two nodes labelled as source and sink.
                            The source node is where the flow begins and the sink node is where flow ends.
                            Each node is connected is connected to at least another node by a line called edge.
                            Each edge has a maximum capacity of flow it can send through.
                            In The input graph, the source must not have any incoming edges and the sink must not have any outgoing edges.
                        </p>
                        <img
                            alt="Input Graph"
                            src="./images/inputGraph.png"
                            className="mx-auto d-block"
                        />
                        <br />
                        <p>
                            The max flow for the above graph is <b>9</b>.
                            The max flow is calculated using the method described below.
                            For each node the input flow and output flow are equal, except for the source and sink node.
                        </p>
                        <img
                            alt="Result Graph and Max Flow"
                            src="./images/resultGraph.png"
                            className="mx-auto d-block"
                        />
                        <br />
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
                        <h2>Other Resource</h2>
                        <p><a href="https://www.geeksforgeeks.org/ford-fulkerson-algorithm-for-maximum-flow-problem/" target="_blank"
                            without="true"
                            rel="noopener noreferrer">The implementation of the Ford-Fulkerson Algorithm</a></p>
                        <p><a href="https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/" target="_blank"
                            without="true"
                            rel="noopener noreferrer">Depth First Search - Introduction & Implementation</a></p>
                        <p><a href="https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/" target="_blank"
                            without="true"
                            rel="noopener noreferrer">Breadth First Search - Introduction & Implementation</a></p>
                    </Col>
                </Row>
            </Container>
        );
    }
}