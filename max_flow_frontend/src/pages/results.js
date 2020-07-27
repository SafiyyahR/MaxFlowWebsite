import React, { Component } from 'react'
import { Container, Col, Row, Button } from 'react-bootstrap'
import '../external-stylesheet.css'
import Title from '../components/title'
import Error from './404'
import Loading from './loading'
import Graph from '../components/graph-template'
export default class Results extends Component {
    title = "Results | MX flow"
    urlString = "";
    constructor(props) {
        super(props);
        this.state = {
            error: { message: "" },
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
        var option = 4;
        if (this.props.location.state != null) {
            option = this.props.location.state.option;
            var details = this.props.location.state.details;
        }
        if (option != null && (option === 1 || option === 2)) {
            this.urlString = "http://mxflow.herokuapp.com/api/maxflow";
            this.getResults(this.urlString, details);
        } else if (option != null && option === 3) {
            this.urlString = "http://mxflow.herokuapp.com/api/random";
            this.getResults(this.urlString, details);
        } else {
            const errorMessage = "Input graph not provided";
            this.state.error = { message: errorMessage };
            this.state.isLoaded = true;
        }
        this.handleResultsSuccess = this.handleResultsSuccess.bind(this);
        this.downloadtxt = this.downloadtxt.bind(this);

    }

    getResults(urlString, details) {
        console.log({ urlString, details });
        fetch(urlString, {
            method: "POST",
            body: JSON.stringify(details),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    this.handleResultsSuccess(result);
                },
                (error) => {
                    this.setState({ error });
                }
            );
    }
    //Checks if the results have been fetched
    handleResultsSuccess(result) {
        if (result && result.sent) {
            var noNodes = result.sink + 1;
            var noEdges = result.edges;
            var inputElements = [];
            var residualElements = [];
            var resultElements = [];
            var nodesPerRow = Math.ceil(Math.sqrt(noNodes));
            var maxWidth = nodesPerRow * 100;
            var xpos = 50;
            var ypos = -50;
            for (let index = 0; index < noNodes; index++) {
                if ((index % nodesPerRow) === 0) {
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
                    data = { "data": { "source": sourceName, "target": sinkName, "label": edge.weight } }
                    inputElements.push(data);
                }
            }
            for (let index = 0; index < result.residual.length; index++) {
                array = result.residual[index];
                for (let index = 0; index < array.length; index++) {
                    edge = array[index];
                    sourceName = edge.start;
                    if (edge.start === 0) {
                        sourceName = "source";
                    } else if (edge.start === noNodes - 1) {
                        sourceName = "sink";
                    }
                    sinkName = edge.end;
                    if (edge.end === noNodes - 1) {
                        sinkName = "sink"
                    } else if (edge.end === 0) {
                        sinkName = "source";
                    }
                    data = { "data": { "source": sourceName, "target": sinkName, "label": edge.weight } }
                    residualElements.push(data);
                }
            }
            for (let index = 0; index < result.result.length; index++) {
                array = result.result[index];
                for (let index = 0; index < array.length; index++) {
                    edge = array[index];
                    sourceName = edge.start;
                    if (edge.start === 0) {
                        sourceName = "source";
                    }
                    sinkName = edge.end;
                    if (edge.end === noNodes - 1) {
                        sinkName = "sink"
                    }
                    data = { "data": { "source": sourceName, "target": sinkName, "label": edge.weight } }
                    resultElements.push(data);
                }
            }
            var width = maxWidth;
            if (maxWidth < 500) {
                width = 500;
            }
            var breakDownFlow = [];
            for (let index = 0; index < result.breakDownOfFlow.length; index++) {
                const outerList = result.breakDownOfFlow[index];
                var indexOfSource = outerList.indexOf(0);
                var row = "";
                for (let i = indexOfSource; i >= 0; i--) {
                    row += outerList[i];
                    if (i === 0) {
                        row += " = ";
                    } else {
                        row += " –> ";
                    }
                }
                row += outerList[(outerList.length - 1)];
                breakDownFlow.push(row);
            }
            this.setState({ noNodes, noEdges, inputElements, residualElements, resultElements, flowBreakDown: breakDownFlow, maxFlow: result.maxFlow, isLoaded: true, style: { "border": "1px solid black", "width": width, "height": maxWidth }, originalGraph: result.original });
        } else {
            this.setState({ noEdges: 0, noNodes: 0, inputElements: [], residualElements: [], resultElements: [], flowBreakDown: [], maxFlow: 0, isLoaded: true, error: { message: result.message }, originalGraph: [] });
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
        const element = document.createElement("a");
        const file = new Blob([txtContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "Graph.txt";
        element.click();
    }
    render() {
        const { error, isLoaded, inputElements, residualElements, resultElements, flowBreakDown, maxFlow, style } = this.state;
        const screenHeight = window.screen.height + "px";
        if (error && error.message !== "") {
            return <Error message={error.message} />
        } else if (!isLoaded) {
            return <Loading />
        } else {
            return (
                <Container style={{ minHeight: screenHeight }} className="container-results py-5" md={10}>
                    <Title title={this.title} />
                    <Row className="pt-5">
                        <Col lg={{ span: 8, offset: 2 }}>
                            <h4>The maximum flow for the below graph is <b>{maxFlow}</b></h4>
                            <h4>Source - 0</h4>
                            <h4>Sink - {this.state.noNodes}</h4>
                        </Col>
                    </Row>
                    <Row >
                        <Col lg={{ span: 8, offset: 2 }}>
                            <h2>Input Graph</h2>
                            <Graph elements={inputElements} style={style} />
                            <Button className="mt-3" onClick={this.downloadtxt} >Download Input Graph as a txt file</Button>
                        </Col>
                    </Row>
                    <Row className="pt-5">
                        <Col lg={{ span: 8, offset: 2 }}>
                            <h2>Result Graph</h2>
                            <Graph elements={resultElements} style={style} />
                        </Col>
                    </Row>
                    <Row className="pt-5">
                        <Col lg={{ span: 8, offset: 2 }}>
                            <h2>Residual Graph</h2>
                            <Graph elements={residualElements} style={style} />
                        </Col>
                    </Row>
                    <Row className="pt-5 pb-5">
                        <Col lg={{ span: 8, offset: 2 }}>
                            <h2>Break Down of flow</h2>

                            {flowBreakDown && flowBreakDown.map((item, index) => (
                                <p><b>{index + 1}.</b>&nbsp;{item}</p>
                            ))}
                        </Col>
                    </Row>

                </Container>
            );
        }
    }
}