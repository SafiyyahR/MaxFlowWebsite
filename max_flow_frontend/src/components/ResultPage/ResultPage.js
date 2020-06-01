import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import Graph from '../Graph/Graph'
import ErrorPage from '../ErrorPage/ErrorPage'
import LoadingPage from '../LoadingPage/LoadingPage'
import '../ResultPage/ResultPage.css'
import Button from 'react-bootstrap/Button'
export default class ResultPage extends Component {
    TITLE = "Results | MX flow"
    urlString = "";
    constructor(props) {
        super(props);
        this.state = {
            error: {},
            isLoaded: false,
            inputElements: [],
            residualElements: [],
            resultElements: [],
            flowBreakDown: [],
            maxFlow: 0,
            style: {},
            noNodes: 0,
            noEdges: 0,
            originalGraph: []
        };
        var option = this.props.location.state.option;
        var details = this.props.location.state.details;
        console.log(option, details);
        if (option != null && (option === 1 || option === 2)) {
            this.urlString = "http://localhost:5000/api/maxflow";
            this.getResults(this.urlString, details);
        } else if (option != null && option === 3) {
            this.urlString = "http://localhost:5000/api/random";
            this.getResults(this.urlString, details);
        } else {
            const errorMessage = "Option selected is invalid.";
            this.setState({ error: errorMessage });
        }
        console.log("this.urlString", this.urlString);
        this.handleResultsSuccess = this.handleResultsSuccess.bind(this);
        this.downloadtxt = this.downloadtxt.bind(this);

    }

    getResults(urlString, details) {
        console.log(details);
        fetch(urlString, {
            method: "POST",
            body: JSON.stringify(details),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.handleResultsSuccess(result);
                },
                (error) => {
                    this.setState({ error });
                }
            );
    }
    //Checks if the results have been fetched
    handleResultsSuccess(result) {
        console.log("item", result);
        if (result && result.sent) {
            console.log(result.original);
            var noNodes = result.sink + 1;
            var noEdges = result.edges;
            var inputElements = [];
            var residualElements = [];
            var resultElements = [];
            var nodesPerRow = Math.ceil(Math.sqrt(noNodes));
            var maxWidth = nodesPerRow * 100;
            console.log(maxWidth);
            var xpos = 50;
            var ypos = -50;
            for (let index = 0; index < noNodes; index++) {
                if ((index % nodesPerRow) == 0) {
                    ypos += 100;
                    xpos = 50
                } else {
                    xpos += 100
                }
                var name = index;
                if (index === 0) {
                    name = "source";
                } else if (index === noNodes - 1) {
                    name = "sink"
                }
                var data = { "data": { "id": name, "label": name }, "position": { "x": xpos, "y": ypos } };
                inputElements.push(data);
                residualElements.push(data);
                resultElements.push(data);
            }
            for (let index = 0; index < result.original.length; index++) {
                var array = result.original[index];
                for (let index = 0; index < array.length; index++) {
                    var edge = array[index];
                    var sourceName = edge.start;
                    if (edge.start === 0) {
                        sourceName = "source";
                    }
                    var sinkName = edge.end;
                    if (edge.end === noNodes - 1) {
                        sinkName = "sink"
                    }
                    var data = { "data": { "source": sourceName, "target": sinkName, "label": edge.weight } }
                    inputElements.push(data);
                }
            }
            for (let index = 0; index < result.residual.length; index++) {
                var array = result.residual[index];
                for (let index = 0; index < array.length; index++) {
                    var edge = array[index];
                    var sourceName = edge.start;
                    if (edge.start === 0) {
                        sourceName = "source";
                    } else if (edge.start === noNodes - 1) {
                        sourceName = "sink";
                    }
                    var sinkName = edge.end;
                    if (edge.end === noNodes - 1) {
                        sinkName = "sink"
                    } else if (edge.end === 0) {
                        sinkName = "source";
                    }
                    var data = { "data": { "source": sourceName, "target": sinkName, "label": edge.weight } }
                    residualElements.push(data);
                }
            }
            for (let index = 0; index < result.result.length; index++) {
                var array = result.result[index];
                for (let index = 0; index < array.length; index++) {
                    var edge = array[index];
                    var sourceName = edge.start;
                    if (edge.start === 0) {
                        sourceName = "source";
                    }
                    var sinkName = edge.end;
                    if (edge.end === noNodes - 1) {
                        sinkName = "sink"
                    }
                    var data = { "data": { "source": sourceName, "target": sinkName, "label": edge.weight } }
                    resultElements.push(data);
                }
            }
            console.log(this.state);
            var width = maxWidth;
            if (maxWidth < 500) {
                width = 500;
            }
            this.setState({ noNodes, noEdges, inputElements, residualElements, resultElements, flowBreakDown: result.breakDownOfFlow, maxFlow: result.maxFlow, isLoaded: true, style: { "border": "1px solid black", "width": width, "height": maxWidth }, originalGraph: result.original }, () => {
                console.log(this.state);
            });
        } else {
            this.setState({ noEdges: 0, noNodes: 0, inputElements: [], residualElements: [], resultElements: [], flowBreakDown: [], maxFlow: 0, isLoaded: true, error: { message: result.message }, originalGraph: [] }, () => {
                console.log(this.state.error);
            });
        }
    }

    downloadtxt() {
        var graph = this.state.originalGraph;
        var noNodes = this.state.noNodes;
        var noEdges = this.state.noEdges;
        var txtContent = noNodes + "\n" + noEdges + "";
        for (let index = 0; index < graph.length; index++) {
            var array = graph[index];
            for (let index1 = 0; index1 < array.length; index1++) {
                var edge = array[index1];
                var row = "\n" + edge.start + " " + edge.weight + " " + edge.end;
                txtContent += row;
            }
        }
        console.log(txtContent);
        const element = document.createElement("a");
        const file = new Blob([txtContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "Graph.txt";
        element.click();
    }
    render() {
        const { error, isLoaded, inputElements, residualElements, resultElements, flowBreakDown, maxFlow, style } = this.state;
        if (error && error.message) {
            return <ErrorPage message={error.message} />
        } else if (!isLoaded) {
            return <LoadingPage />
        } else {
            return (
                <Container className="container-results">
                    <Row className="pt-5">
                        <Col>
                            <h3>Max Flow is <b>{maxFlow}</b></h3>
                        </Col>
                    </Row>
                    <Row >
                        <Col>
                            <h2>Input Graph</h2>
                            <Graph elements={inputElements} style={style} />
                            <Button className="mt-3" onClick={this.downloadtxt} >Download Input Graph as a txt file</Button>
                        </Col>
                    </Row>
                    <Row className="pt-5">
                        <Col>
                            <h2>Result Graph</h2>
                            <Graph elements={resultElements} style={style} />
                        </Col>
                    </Row>
                    <Row className="pt-5">
                        <Col>
                            <h2>Residual Graph</h2>
                            <Graph elements={residualElements} style={style} />
                        </Col>
                    </Row>
                    <Row className="pt-5">
                        <Col>
                            <h2>Break Down of flow</h2>
                        </Col>
                    </Row>

                </Container>

            );
        }
    }
}