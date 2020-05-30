import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { Container, Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import '../FindMaxFlow/FindMaxFlow.css'
import '../../index.css'
export default class FindMaxFlow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graphClass: "show",
            fileClass: "hide",
            randomClass: "hide",
            graphMaxFlowBtnDis: "disabled",
            uploadBtnDis: "disabled",
            uploadingBtnClass: "hide",
            fileMaxFlowBtnClass: "hide",
            randMaxFlowBtnDis: "disabled",
            isFormValid: false,
            noNodes: 0,
            noNodesClass: "hide",
            noNodesFeedback: "Please enter an integer.",
            noEdges: 0,
            noEdgesClass: "hide",
            noEdgesFeedback: "Please enter an integer.",
            txtFileClass: "hide",
            txtFileClassFeedBack: "Please upload a file with a txt extension"
        }
        this.endNodeFeedBackRef = React.createRef();
        this.handleOptionSelected = this.handleOptionSelected.bind(this);
        this.validateNoNodes = this.validateNoNodes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateNoEdges = this.validateNoEdges.bind(this);
        this.validateNode = this.validateNode.bind(this);
        this.validateWeight = this.validateWeight.bind(this);
    }

    handleOptionSelected(event) {
        console.log("value", event.target.value);
        var value = event.target.value;
        if (value && value === "1") {
            this.setState({ graphClass: "show" });
            this.setState({ fileClass: "hide" });
            this.setState({ randomClass: "hide" });
        } else if (value && value === "2") {
            this.setState({ graphClass: "hide" });
            this.setState({ fileClass: "show" });
            this.setState({ randomClass: "hide" });
        } else if (value && value === "3") {
            this.setState({ graphClass: "hide" });
            this.setState({ fileClass: "hide" });
            this.setState({ randomClass: "show" });
        }

    }

    validateNoNodes(event) {
        var noNodes = event.target.value;
        if (noNodes != parseInt(noNodes)) {
            this.setState({ noNodesFeedback: "Please enter an integer.", noNodesClass: "show", noNodes: 0 });
        } else if (noNodes > 3 && noNodes <= 400) {
            this.setState({ noNodes: parseInt(noNodes), noNodesClass: "hide", noNodesFeedback: "" });
        } else if (noNodes <= 3) {
            this.setState({ noNodesFeedback: "Please enter an integer greater than 3.", noNodesClass: "show", noNodes: 0 });
        } else if (noNodes > 400) {
            this.setState({ noNodesFeedback: "Please enter an integer lesser than 400.", noNodesClass: "show", noNodes: 0 });
        }
        console.log(noNodes, this.state.noNodes);
    }
    validateNode(event) {
        var nodeVal = event.target.value;
        if (nodeVal == 0) {
            this.endNodeFeedBackRef.value = "The end node cannot be 0 as it is the source"
            console.log(this.endNodeFeedBackRef.value);
        }


    }

    validateNoEdges(event) {
        var noEdges = event.target.value;
        var noNodes = this.state.noNodes;
        var maxNoOfEdges = (noNodes * noNodes) - (3 * noNodes) + 3;
        if (noEdges != parseInt(noEdges)) {
            this.setState({ noEdgesFeedback: "Please enter an integer.", noEdgesClass: "show", noEdges: 0 });
        } else if (noNodes === 0) {
            this.setState({ noEdgesFeedback: "Please enter an integer for the number of nodes first.", noEdgesClass: "show", noEdges: 0 });
        } else if (noEdges < noNodes) {
            this.setState({ noEdgesFeedback: ("Please enter an integer that is greater than " + (noNodes - 1) + "."), noEdgesClass: "show", noEdges: 0 });
        } else if (noEdges >= noNodes && noEdges <= maxNoOfEdges) {
            this.setState({ noEdges: noEdges, noEdgesFeedback: "", noEdgesClass: "hide" });
        } else if (noEdges > maxNoOfEdges) {
            this.setState({ noEdgesFeedback: ("Please enter an integer less than " + maxNoOfEdges), noEdgesClass: "show", noEdges: 0 });
        }
        console.log(this.state.noEdges, noEdges, maxNoOfEdges, noNodes);
    }
    validateWeight(event) {
        var noNodes = event.target.value;
        if (noNodes > 3 && noNodes <= 400) {

        }
    }
    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({ isFormValid: false });
    };

    componentDidMount() {
        console.log(this.endNodeFeedBackRef.value);
    }
    render() {
        const { graphClass, fileClass, randomClass, uploadingBtnClass, fileMaxFlowBtnClass, randMaxFlowBtnDis, uploadBtnDis, graphMaxFlowBtnDis, isFormValid, noEdges, noNodesClass, noNodesFeedback, noEdgesClass, noEdgesFeedback, txtFileClass, txtFileClassFeedBack } = this.state;
        console.log(graphClass, fileClass, randomClass);
        if (noEdges > 0) {
            var rows = [];
            for (let index = 0; index < noEdges; index++) {
                rows.push(<Row key={index}>
                    <Form.Group controlId={"form-start-node" + index}>
                        <Col className="form-label-2">
                            <Form.Label column >Start Node {index + 1}</Form.Label>
                        </Col>
                        <Col >
                            <Form.Control placeholder="0" />
                        </Col >
                    </Form.Group>
                    <Form.Group controlId={"form-weight-edge" + index}>
                        <Col className="form-label-2">
                            <Form.Label column >Weight {index + 1}</Form.Label>
                        </Col>
                        <Col >
                            <Form.Control placeholder="10" />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId={"form-end-node" + index}>
                        <Col className="form-label-2">
                            <Form.Label column  >End Node {index + 1}</Form.Label>
                        </Col>
                        <Col >
                            <Form.Control onChange={this.validateNode} placeholder="10" />
                            <Form.Control.Feedback type="invalid" ref={ref => this.endNodeFeedBackRef = ref} className="show">
                                {}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                </Row>);
            }
        }
        return (
            < Container className="pt-5 main-container" >
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
                                            value="1"
                                            onChange={this.handleOptionSelected}
                                            defaultChecked
                                        /><Form.Check
                                            type="radio"
                                            label="By uploading a file"
                                            name="form-radio-opt"
                                            id="form-radio-opt2"
                                            value="2"
                                            onChange={this.handleOptionSelected}
                                        /><Form.Check
                                            type="radio"
                                            label="By using a randomly generated graph"
                                            name="form-radio-opt"
                                            id="form-radio-opt3"
                                            value="3"
                                            onChange={this.handleOptionSelected}
                                        />
                                    </Col>
                                </Form.Group>
                            </fieldset>
                        </Form>
                    </Col>
                </Row>
                <Row className={graphClass}>
                    <Form validated={isFormValid} onSubmit={this.handleSubmit}>
                        <Col>
                            <h2>Enter Graph Information</h2>

                            <Form.Group as={Row} controlId="form-no-nodes">
                                <Form.Label column md={4}>Number of Nodes in Graph</Form.Label>
                                <Col md={4}>
                                    <Form.Control placeholder="6" onChange={this.validateNoNodes} />
                                    <Form.Control.Feedback type="invalid" className={noNodesClass}>
                                        {noNodesFeedback}
                                    </Form.Control.Feedback></Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="form-no-edges">
                                <Form.Label column md={4}>Number of Edges in Graph</Form.Label>
                                <Col md={4}>
                                    <Form.Control placeholder="11" onChange={this.validateNoEdges} />
                                    <Form.Control.Feedback type="invalid" className={noEdgesClass}>
                                        {noEdgesFeedback}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            {rows}
                            <Form.Group as={Row}>
                                <Col>
                                    <Button className="form-submit-btn" disabled={graphMaxFlowBtnDis}>Find Max Flow</Button>
                                </Col>
                            </Form.Group>
                        </Col>

                    </Form>
                </Row>
                <Row className={fileClass}>
                    <Form validated={isFormValid} onSubmit={this.handleSubmit}>
                        <Col>
                            <h2>Upload<Button className="upld-file-format"><h2><u>File</u></h2></Button>with graph information</h2>
                            <Form.Group >
                                <Form.File id="form-upload-file" >
                                    <Form.File.Input accept=".txt" onChange={this.validateFile} />
                                </Form.File>
                                <Form.Control.Feedback type="invalid" className={txtFileClass}>
                                    {txtFileClassFeedBack}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Col>
                                    <Button className="form-submit-btn" disabled={uploadBtnDis}>Upload File</Button>
                                </Col>
                            </Form.Group>
                            <Form.Group className={uploadingBtnClass}>
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
                            <Form.Group as={Row} className={fileMaxFlowBtnClass}>
                                <Col>
                                    <Button className="form-submit-btn">Find Max Flow</Button>
                                </Col>
                            </Form.Group>
                        </Col>

                    </Form>
                </Row>
                <Row className={randomClass}>
                    <Form validated={isFormValid} onSubmit={this.handleSubmit}>
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
                                    <Button className="form-submit-btn" disabled={randMaxFlowBtnDis}>Find Max Flow</Button>
                                </Col>
                            </Form.Group>
                        </Col>

                    </Form>
                </Row>
            </Container >
        );
    }
}