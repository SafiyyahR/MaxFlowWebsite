import React, { Component } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
export default class EdgeForm extends Component {
    constructor(props) {
        super(props);
        const index = props.index;
        const noNodes = props.nodes;
        this.state = {
            index: index,
            noNodes: noNodes,
            startNodeClass: "hide",
            startNodeFeedback: "",
            startNode: -1,
            endNodeClass: "hide",
            endNodeFeedback: "",
            endNode: -1,
            weightClass: "hide",
            weightFeedback: "",
            weight: 0
        }
        this.validateStartNode = this.validateStartNode.bind(this);
        this.validateWeight = this.validateWeight.bind(this);
        this.validateEndNode = this.validateEndNode.bind(this);
        this.sendDataToParent = this.sendDataToParent.bind(this);
    }

    sendDataToParent() {
        if (this.state.endNode !== -1 && this.state.startNode !== -1 && this.state.weight !== 0) {
            return this.props.getData({ "index": this.state.index, "edge": [this.state.startNode, this.state.weight, this.state.endNode], "valid": true });
        } else {
            return this.props.getData({ "index": this.state.index, "valid": false });
        }
    }

    validateEndNode(event) {
        var endNode = event.target.value;
        var endNodeClass = "hide";
        var endNodeFeedback = "";
        if (endNode != parseInt(endNode)) {
            endNodeFeedback = "Please enter an integer";
            endNodeClass = "show";
            endNode = -1;
        } else if (endNode == 0) {
            endNodeFeedback = "Node 0 cannot be an end node.";
            endNodeClass = "show";
            endNode = -1;
        } else if (endNode < 0 || endNode >= this.state.noNodes) {
            endNodeFeedback = "Node " + endNode + " is not in the graph.";
            endNodeClass = "show";
            endNode = -1;
        } else if (endNode == this.state.startNode) {
            endNodeFeedback = "Start node and end node cannot be the same.";
            endNodeClass = "show";
            endNode = -1;
        } else if (endNode > 0 && endNode <= this.state.noNodes - 1) {
            endNodeFeedback = "";
            endNodeClass = "hide";
            endNode = parseInt(endNode);
        }
        this.setState({ endNodeFeedback, endNodeClass, endNode }, () => {
            this.sendDataToParent();
        });
    }

    validateWeight(event) {
        var weight = event.target.value;
        var weightClass = "hide";
        var weightFeedback = 0;
        if (weight != parseInt(weight)) {
            weightFeedback = "Please enter an integer.";
            weightClass = "show";
            weight = 0;
        } else if (weight <= 0) {
            weightFeedback = "Weight of an edge must be greater than zero.";
            weightClass = "show";
            weight = 0;
        } else if (weight > 2147483647) {
            weightFeedback = "Weight of an edge must be lesser than 2147483647.";
            weightClass = "show";
            weight = 0;
        } else {
            weightFeedback = "";
            weightClass = "hide";
            weight = parseInt(weight);
        }
        this.setState({ weight, weightClass, weightFeedback }, () => {
            this.sendDataToParent();
        })
    }
    validateStartNode(event) {
        var startNode = event.target.value;
        var startNodeClass = "hide";
        var startNodeFeedback = "-1";
        if (startNode != parseInt(startNode)) {
            startNodeFeedback = "Please enter an integer.";
            startNodeClass = "show";
            startNode = -1;
        } else if (startNode == this.state.noNodes - 1) {
            startNodeFeedback = "Node " + (this.state.noNodes - 1) + " cannot be an start node.";
            startNodeClass = "show";
            startNode = -1;
        } else if (startNode < 0 || startNode >= this.state.noNodes) {
            startNodeFeedback = "Node " + startNode + " is not in the graph.";
            startNodeClass = "show";
            startNode = -1;
        } else if (startNode == this.state.endNode) {
            startNodeFeedback = "Start node and end node cannot be the same.";
            startNodeClass = "show";
            startNode = -1;
        } else if (startNode >= 0 && startNode < this.state.noNodes - 1) {
            startNodeFeedback = "";
            startNodeClass = "hide";
            startNode = parseInt(startNode);
        }
        this.setState({ startNodeFeedback, startNodeClass, startNode }, () => {
            this.sendDataToParent();
        });
    }

    render() {
        const { index, startNodeClass, startNodeFeedback, endNodeClass, endNodeFeedback, weightClass, weightFeedback } = this.state;
        return (
            <Row >
                <Form.Group controlId={"form-start-node" + index}>
                    <Col className="form-label-2">
                        <Form.Label column >Start Node {index + 1}</Form.Label>
                    </Col>
                    <Col >
                        <Form.Control onChange={this.validateStartNode} />
                        <Form.Control.Feedback type="invalid" className={startNodeClass}>
                            {startNodeFeedback}
                        </Form.Control.Feedback>
                    </Col >
                </Form.Group>
                <Form.Group controlId={"form-weight-edge" + index}>
                    <Col className="form-label-2">
                        <Form.Label column >Weight {index + 1}</Form.Label>
                    </Col>
                    <Col >
                        <Form.Control onChange={this.validateWeight} />
                        <Form.Control.Feedback type="invalid" className={weightClass}>
                            {weightFeedback}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group controlId={"form-end-node" + index}>
                    <Col className="form-label-2">
                        <Form.Label column  >End Node {index + 1}</Form.Label>
                    </Col>
                    <Col >
                        <Form.Control onChange={this.validateEndNode} />
                        <Form.Control.Feedback type="invalid" className={endNodeClass}>
                            {endNodeFeedback}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
            </Row>
        );
    }
}