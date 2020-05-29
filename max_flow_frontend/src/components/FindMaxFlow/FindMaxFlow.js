import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { Container, Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import '../FindMaxFlow/FindMaxFlow.css'
export default class FindMaxFlow extends Component {

    render() {
        return (
            < Container className="pt-5">
                <Row>
                    <Col>
                        <h2>Find Max Flow</h2>
                        <Form>
                            <fieldset>
                                <Form.Group as={Row}>
                                    <Col >
                                        <Form.Check
                                            type="radio"
                                            label="By entering the graph information"
                                            name="form-radio-opt"
                                            id="form-radio-opt1"
                                        /><Form.Check
                                            type="radio"
                                            label="By uploading a file"
                                            name="form-radio-opt"
                                            id="form-radio-opt2"
                                        /><Form.Check
                                            type="radio"
                                            label="By using a randomly generated graph"
                                            name="form-radio-opt"
                                            id="form-radio-opt3"
                                        />
                                    </Col>
                                </Form.Group>
                            </fieldset>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Form>
                        <Col>
                            <h2>Enter Graph Information</h2>

                            <Form.Group as={Row} controlId="form-no-nodes">
                                <Form.Label column md={4}>Number of Nodes in Graph</Form.Label>
                                <Col md={4}>
                                    <Form.Control placeholder="6" /></Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="form-no-edges">
                                <Form.Label column md={4}>Number of Edges in Graph</Form.Label>
                                <Col md={4}>
                                    <Form.Control placeholder="11" /></Col>
                            </Form.Group>
                            <Row>
                                <Form.Group controlId="form-start-node">
                                    <Col className="form-label-2">
                                        <Form.Label column >Start Node</Form.Label>
                                    </Col>
                                    <Col >
                                        <Form.Control placeholder="0" />
                                    </Col >
                                </Form.Group>
                                <Form.Group controlId="form-weight-edge">
                                    <Col className="form-label-2">
                                        <Form.Label column >Weight Node</Form.Label>
                                    </Col>
                                    <Col >
                                        <Form.Control placeholder="10" />
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="form-end-node">
                                    <Col className="form-label-2">
                                        <Form.Label column >End Node</Form.Label>
                                    </Col>
                                    <Col >
                                        <Form.Control placeholder="10" />
                                    </Col>
                                </Form.Group>

                            </Row>
                            <Form.Group as={Row}>
                                <Col>
                                    <Button class="form-submit-btn">Find Max Flow</Button>
                                </Col>
                            </Form.Group>
                        </Col>

                    </Form>
                </Row>
                <Row>
                    <Form>
                        <Col>
                            <h2>Upload<Button className="upld-file-format"><h2><u>File</u></h2></Button>with graph information</h2>
                            <Form.Group >
                                <Form.File id="form-upload-file">
                                    <Form.File.Input />
                                </Form.File>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col>
                                    <Button class="form-submit-btn">Upload File</Button>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" disabled>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                        Uploading...
                                </Button>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col>
                                    <Button class="form-submit-btn">Find Max Flow</Button>
                                </Col>
                            </Form.Group>
                        </Col>

                    </Form>
                </Row>
                <Row>
                    <Form>
                        <Col>
                            <h2>Enter information of graph to be generated </h2>

                            <Form.Group as={Row} controlId="form-no-nodes-gr">
                                <Form.Label column md={4}>Number of Nodes in Graph</Form.Label>
                                <Col md={4}>
                                    <Form.Control placeholder="6" /></Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="form-no-edges-gr">
                                <Form.Label column md={4}>Number of Edges in Graph</Form.Label>
                                <Col md={4}>
                                    <Form.Control placeholder="5" /></Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="form-max-weight-gr">
                                <Form.Label column md={4}>Max weight of edge</Form.Label>
                                <Col md={4}>
                                    <Form.Control placeholder="5" /></Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col>
                                    <Button class="form-submit-btn">Find Max Flow</Button>
                                </Col>
                            </Form.Group>
                        </Col>

                    </Form>
                </Row>
            </Container >
        );
    }
}