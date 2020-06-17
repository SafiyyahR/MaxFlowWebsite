import React, { Component } from 'react'
import { Container, Col, Row, Button, Spinner, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../external-stylesheet.css'
import Title from '../components/title'
import GraphForm from '../components/graph-form'
import CustomModal from '../components/custom-modal';
import EdgeForm from '../components/edge-form'
export default class MaxFlow extends Component {
    title = "Find Max Flow | MX flow"
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            graphClass: "show",
            fileClass: "hide",
            randomClass: "hide",
            uploadingBtnClass: "hide",
            uploadBtnClass: "show",
            noNodes: 0,
            noEdges: 0,
            nodeEdgesValid: false,
            edgeArray: [],
            edgeArrayValid: false,
            txtFileClass: "hide",
            txtFileClassFeedBack: "Please upload a file with a txt extension.",
            nodeEdgesGrValid: false,
            noEdgesGr: 0,
            noNodesGr: 0,
            weightClass: "hide",
            weightFeedback: "",
            weight: 0,
            maxWeightValid: false,
            txtFileChosen: false,
            noEdgesFile: 0,
            noNodesFile: 0,
            nodeEdgesFileValid: false,
            edgeArrayFile: [],
            edgeArrayFileValid: false

        }
        this.handleOptionSelected = this.handleOptionSelected.bind(this);
        this.validateMaxWeight = this.validateMaxWeight.bind(this);
        this.getDataFromSubForm = this.getDataFromSubForm.bind(this);
        this.getDataFromEdges = this.getDataFromEdges.bind(this);
        this.getDataFromRand = this.getDataFromRand.bind(this);
        this.validateFile = this.validateFile.bind(this);
        this.setShowModal = this.setShowModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    handleOptionSelected(event) {
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

    validateMaxWeight(event) {
        var weight = event.target.value;
        var weightClass = "hide";
        var weightFeedback = 0;
        var maxWeightValid = false;
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
            maxWeightValid = true;
        }
        this.setState({ weight, weightClass, weightFeedback, maxWeightValid });
    }
    getDataFromRand(data) {
        if (data && data.valid) {
            this.setState({ noEdgesGr: data.noEdges, noNodesGr: data.noNodes, nodeEdgesGrValid: true });
        } else {
            this.setState({ noEdgesGr: 0, noNodesGr: 0 });
        }
    }

    validateFile(file) {
        this.setState({ uploadBtnClass: "hide", uploadingBtnClass: "show" }, () => {
            let fileData = new FileReader();
            fileData.onloadend = this.handleFile;
            fileData.readAsText(file);
        });
    }
    handleFile = (e) => {
        const content = e.target.result;
        var details = content.split("\n");
        var noEdges = 0;
        var noNodes = 0;
        var nodeEdgesFileValid = false;
        var edgeArrayFile = [];
        var edgeArrayFileValid = false;
        var txtFileClassFeedBack = "Insufficient details provided.";
        var txtFileClass = "show";
        if (details.length > 2) {
            noNodes = details[0];
            if (noNodes != parseInt(noNodes)) {
                txtFileClassFeedBack = "Please enter an integer for the number of nodes.";
                txtFileClass = "show";
                noNodes = 0
            } else if (noNodes > 3 && noNodes <= 100) {
                txtFileClass = "hide";
                txtFileClassFeedBack = "";
                noNodes = parseInt(noNodes);
            } else if (noNodes <= 3) {
                txtFileClassFeedBack = "Please enter an integer greater than 3 for the number of nodes."
                txtFileClass = "show";
                noNodes = 0
            } else if (noNodes > 100) {
                txtFileClassFeedBack = "Please enter an integer lesser than 100 for the number of nodes.";
                txtFileClass = "show";
                noNodes = 0;
            }
            if (noNodes !== 0) {
                noEdges = details[1];
                var maxNoOfEdges = (noNodes * noNodes) - (3 * noNodes) + 2;
                txtFileClassFeedBack = "";
                txtFileClass = "hide";
                if (noEdges != parseInt(noEdges)) {
                    txtFileClassFeedBack = "Please enter an integer for the number of edges.";
                    txtFileClass = "show";
                    noEdges = 0;
                } else if (noNodes === 0) {
                    txtFileClassFeedBack = "Please enter an integer for the number of nodes first for the number of edges.";
                    txtFileClass = "show";
                    noEdges = 0;
                } else if (noEdges < noNodes) {
                    txtFileClassFeedBack = "Please enter an integer that is greater than " + (noNodes - 1) + " for the number of edges.";
                    txtFileClass = "show";
                    noEdges = 0;
                } else if (noEdges >= noNodes && noEdges <= maxNoOfEdges) {
                    txtFileClassFeedBack = "";
                    txtFileClass = "hide";
                    noEdges = parseInt(noEdges);
                } else if (noEdges > maxNoOfEdges) {
                    txtFileClassFeedBack = "Please enter an integer less than " + maxNoOfEdges + " for the number of edges.";
                    txtFileClass = "show";
                    noEdges = 0;
                }
                if (noEdges != 0) {
                    edgeArrayFileValid = true;
                    nodeEdgesFileValid = true;
                    for (let index = 2; index < (noEdges + 2); index++) {
                        const row = details[index];
                        var edge = row.split(" ");
                        if (edge.length === 3) {
                            var edgeValid = true;
                            var validEdge = [];
                            for (let index1 = 0; index1 < edge.length; index1++) {
                                if (edge[index1] != parseInt(edge[index1])) {
                                    edgeValid = false;
                                    txtFileClass = "show";
                                    txtFileClassFeedBack = "The file must only contain integers.";
                                    edgeArrayFile = [];
                                    edgeArrayFileValid = false;
                                    break;
                                } else {
                                    validEdge.push(parseInt(edge[index1]))
                                }
                            }
                            if (edgeValid) {
                                edgeArrayFile.push(validEdge);
                            }
                        } else {
                            txtFileClass = "show";
                            txtFileClassFeedBack = "Edge " + (index - 2) + " does not have enough information.";
                            edgeArrayFile = [];
                            edgeArrayFileValid = false;
                        }
                    }
                    if (edgeArrayFileValid) {
                        txtFileClass = "hide";
                        txtFileClassFeedBack = "";
                    }
                }
            }
        }
        this.setState({ txtFileClass, txtFileClassFeedBack, "noEdgesFile": noEdges, "noNodesFile": noNodes, nodeEdgesFileValid, edgeArrayFile, edgeArrayFileValid, uploadBtnClass: "show", uploadingBtnClass: "hide" });
    }
    getDataFromSubForm(data) {
        if (data && data.valid) {
            this.setState({ noEdges: data.noEdges, noNodes: data.noNodes, nodeEdgesValid: true }, () => {
                var list = [];
                for (let index = 0; index < data.noEdges; index++) {
                    list.push([]);
                }
                this.setState({ edgeArray: list });
            });
        } else {
            this.setState({ noEdges: 0, noNodes: 0 }, () => {
                var list = [];
                for (let index = 0; index < data.noEdges; index++) {
                    list.push([]);
                }
                this.setState({ edgeArray: list });
            });
        }
    }

    getDataFromEdges(data) {
        var newList = this.state.edgeArray;
        if (data && data.valid) {
            newList[data.index] = data.edge;
        } else {
            newList[data.index] = [];
        }
        var isValid = true;
        this.setState({ edgeArray: newList }, () => {
            for (let index = 0; index < newList.length; index++) {
                if (newList[index].length === 0) {
                    isValid = false;
                    break;
                }

            }
            this.setState({ edgeArrayValid: isValid });
        });
    }

    openModal(event) {
        this.setShowModal(true);
    }
    setShowModal(choice) {
        this.setState({ showModal: choice });
    }
    clearForm() {
        this.setState({
            showModal: false,
            graphClass: "show",
            fileClass: "hide",
            randomClass: "hide",
            uploadingBtnClass: "hide",
            uploadBtnClass: "show",
            noNodes: 0,
            noEdges: 0,
            nodeEdgesValid: false,
            edgeArray: [],
            edgeArrayValid: false,
            txtFileClass: "hide",
            txtFileClassFeedBack: "Please upload a file with a txt extension.",
            nodeEdgesGrValid: false,
            noEdgesGr: 0,
            noNodesGr: 0,
            weightClass: "hide",
            weightFeedback: "",
            weight: 0,
            maxWeightValid: false,
            txtFileChosen: false,
            noEdgesFile: 0,
            noNodesFile: 0,
            nodeEdgesFileValid: false,
            edgeArrayFile: [],
            edgeArrayFileValid: false
        });
    }
    render() {
        const { noNodes, graphClass, fileClass, randomClass, uploadingBtnClass, uploadBtnClass, fileMaxFlowBtnClass, noEdges, txtFileClass, txtFileClassFeedBack, weightClass, weightFeedback, showModal } = this.state;
        const infoDis = this.state.edgeArrayValid && this.state.nodeEdgesValid ? "" : "disabled";
        const fileDis = this.state.edgeArrayFileValid && this.state.nodeEdgesFileValid ? "" : "disabled";
        const graphDis = this.state.maxWeightValid && this.state.nodeEdgesGrValid ? "" : "disabled";
        if (noEdges > 0) {
            var rows = [];
            for (let index = 0; index < noEdges; index++) {
                rows.push(<EdgeForm key={index} index={index} nodes={noNodes} getData={this.getDataFromEdges} />);
            }
        }
        const detailsInfo = { "noNodes": this.state.noNodes, "noEdges": this.state.noEdges, "edgeArray": this.state.edgeArray };
        const detailsFile = { "noNodes": this.state.noNodesFile, "noEdges": this.state.noEdgesFile, "edgeArray": this.state.edgeArrayFile };
        const detailsRand = { "noNodes": this.state.noNodesGr, "noEdges": this.state.noEdgesGr, "maxWeight": this.state.weight };
        const screenHeight = window.screen.height + "px";
        return (
            < Container style={{ minHeight: screenHeight }} className="pt-5" >
                <Title title={this.title} />
                <Row>
                    <Col lg={{ span: 8, offset: 2 }}>
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
                    <Form>
                        <Col lg={{ span: 8, offset: 2 }}>
                            <h2>Enter Graph Information</h2>
                            <GraphForm getData={this.getDataFromSubForm} />
                            {rows}
                            <Form.Group as={Row}>
                                <Col>
                                    <Link to={{
                                        pathname: "/results",
                                        state: {
                                            details: detailsInfo,
                                            option: 1
                                        }
                                    }}><Button className="form-submit-btn" disabled={infoDis}>Find Max Flow</Button></Link>
                                </Col>
                                <Col md={7} className="px-md-5">
                                    <Button variant="secondary" className="form-clear-btn px-5" type="reset" onClick={this.clearForm} >Clear</Button>
                                </Col>
                            </Form.Group>
                        </Col>

                    </Form>
                </Row>
                <Row className={fileClass}>
                    <Form>
                        <Col lg={{ span: 8, offset: 2 }}>
                            <h2>Upload<Button onClick={this.openModal} className="upld-file-format"><h2><u>File</u></h2></Button>
                                <CustomModal
                                    show={showModal}
                                    onHide={this.setShowModal}
                                />
                                  with graph information</h2>
                            <Form.Group >
                                <Form.File className={uploadBtnClass} id="form-upload-file" custom>
                                    <Form.File.Input className="col-md-4" onChange={e =>
                                        this.validateFile(e.target.files[0])} accept=".txt" />
                                    <Form.File.Label className="col-md-4" data-browse="Upload File">
                                        flow.txt
                                    </Form.File.Label>
                                </Form.File>
                                <Form.Control.Feedback type="invalid" className={txtFileClass}>
                                    {txtFileClassFeedBack}
                                </Form.Control.Feedback>
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
                            <Form.Group as={Row}>
                                <Col className={fileMaxFlowBtnClass}>
                                    <Link to={{
                                        pathname: "/results",
                                        state: {
                                            details: detailsFile,
                                            option: 2
                                        }
                                    }}><Button className="form-submit-btn" disabled={fileDis}>Find Max Flow</Button></Link>
                                </Col>
                            </Form.Group>
                        </Col>

                    </Form>
                </Row>
                <Row className={randomClass}>
                    <Form>
                        <Col lg={{ span: 8, offset: 2 }}>
                            <h2>Enter information of graph to be generated </h2>
                            <GraphForm getData={this.getDataFromRand} />
                            <Form.Group as={Row} controlId={"form-max-weight"}>
                                <Form.Label column md={4} >Max Weight of an Edge</Form.Label>
                                <Col md={4} >
                                    <Form.Control onChange={this.validateMaxWeight}/>
                                    <Form.Control.Feedback type="invalid" className={weightClass}>
                                        {weightFeedback}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col>
                                    <Link to={{
                                        pathname: "/results",
                                        state: {
                                            details: detailsRand,
                                            option: 3
                                        }
                                    }}><Button className="form-submit-btn" disabled={graphDis}>Find Max Flow</Button></Link>
                                </Col>
                                <Col md={7} className="px-md-5">
                                    <Button variant="secondary" className="form-clear-btn px-5" type="reset" onClick={this.clearForm} >Clear</Button>
                                </Col>
                            </Form.Group>
                        </Col>

                    </Form>
                </Row>
            </Container >
        );
    }
}