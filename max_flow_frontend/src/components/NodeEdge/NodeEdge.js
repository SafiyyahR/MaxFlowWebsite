import React, { Component } from 'react'
import { Col, Row, Form, Container } from 'react-bootstrap'
export default class NodeEdge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noNodes: 0,
            noNodesClass: "hide",
            noNodesFeedback: "Please enter an integer.",
            noEdges: 0,
            noEdgesClass: "hide",
            noEdgesFeedback: "Please enter an integer.",
        }
        this.validateNoEdges = this.validateNoEdges.bind(this);
        this.validateNoNodes = this.validateNoNodes.bind(this);
        this.sendDataToParent = this.sendDataToParent.bind(this);
    }

    sendDataToParent() {
        if (this.state.noNodes !== 0 && this.state.noEdges !== 0) {
            return this.props.getData({ "noNodes": this.state.noNodes, "noEdges": this.state.noEdges, "valid": true });
        } else {
            return this.props.getData({ "valid": false });
        }
    }
    validateNoNodes(event) {
        var noNodes = event.target.value;
        var noNodesFeedback = "";
        var noNodesClass = "hide";
        if (noNodes != parseInt(noNodes)) {
            noNodesFeedback = "Please enter an integer.";
            noNodesClass = "show";
            noNodes = 0
        } else if (noNodes > 3 && noNodes <= 100) {
            noNodesClass = "hide";
            noNodesFeedback = "";
            noNodes = parseInt(noNodes);
        } else if (noNodes <= 3) {
            noNodesFeedback = "Please enter an integer greater than 3."
            noNodesClass = "show";
            noNodes = 0
        } else if (noNodes > 100) {
            noNodesFeedback = "Please enter an integer lesser than 100.";
            noNodesClass = "show";
            noNodes = 0;
        }
        this.setState({ noNodesFeedback, noNodesClass, noNodes }, () => {
            console.log(noNodes, this.state.noNodes);
            this.validateNoEdges("");
            this.sendDataToParent()
        });

    }

    validateNoEdges(event) {
        var noEdges = 0
        if (event != "") {
            noEdges = event.target.value;
        }
        else {
            noEdges = this.state.noEdges;
        }
        var noNodes = this.state.noNodes;
        var maxNoOfEdges = (noNodes * noNodes) - (3 * noNodes) + 2;
        var noEdgesFeedback = "";
        var noEdgesClass = "hide";
        if (noEdges != parseInt(noEdges)) {
            noEdgesFeedback = "Please enter an integer.";
            noEdgesClass = "show";
            noEdges = 0;
        } else if (noNodes === 0) {
            noEdgesFeedback = "Please enter an integer for the number of nodes first.";
            noEdgesClass = "show";
            noEdges = 0;
        } else if (noEdges < noNodes) {
            noEdgesFeedback = "Please enter an integer that is greater than " + (noNodes - 1) + ".";
            noEdgesClass = "show";
            noEdges = 0;
        } else if (noEdges >= noNodes && noEdges <= maxNoOfEdges) {
            noEdgesFeedback = "";
            noEdgesClass = "hide";
            noEdges = parseInt(noEdges);
        } else if (noEdges > maxNoOfEdges) {
            noEdgesFeedback = "Please enter an integer less than " + maxNoOfEdges;
            noEdgesClass = "show";
            noEdges = 0;
        }
        this.setState({ noEdges, noEdgesClass, noEdgesFeedback }, () => {
            console.log(this.state.noEdges, maxNoOfEdges, this.state.noNodes);
            this.sendDataToParent();
        });

    }
    render() {
        const { noEdgesClass, noNodesClass, noEdgesFeedback, noNodesFeedback } = this.state;
        return (
            <Container className="p-0 m-0">
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
            </Container>
        );
    }
}