import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import Graph from '../Graph/Graph'
import ErrorPage from '../ErrorPage/ErrorPage'
import LoadingPage from '../LoadingPage/LoadingPage'
import '../ResultPage/ResultPage.css'
export default class ResultPage extends Component {
    TITLE = "Results | MX flow"
    urlString = "";
    constructor(props) {
        super(props);
        this.state = {
            error: {},
            isLoaded: false,
            inputElements: {},
            residualElements: {},
            resultElements: {},
            flowBreakDown: {},
            maxFlow: {},
            style: {}
        };
        const option = props.option;
        if (option != null && option === 1) {
            const noNodes = props.noNodes;
            const noEdges = props.noEdges;
            const edgeArray = props.edgeArray;
            this.urlString = "http://localhost:5000/api/maxflow";
            this.getResults(this.urlString, { noNodes, noEdges, edgeArray });
        } else if (option != null && option === 2) {
            const fileDetails = props.fileDetails;
            this.urlString = "http://localhost:5000/api/file";
            this.getResults(this.urlString, { fileDetails });
        }
        else if (option != null && option === 3) {
            const noNodes = props.noNodes;
            const noEdges = props.noEdges;
            const maxWeight = props.maxWeight;
            this.urlString = "http://localhost:5000/api/random";
            this.getResults(this.urlString, { noNodes, noEdges, maxWeight });
        } else {
            const errorMessage = "Option selected is invalid.";
            this.setState({ error: errorMessage });
        }
        console.log("this.urlString", this.urlString);

    }

    getResults(urlString, details) {
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
        console.log("item", result);
        this.setState({ inputElements: result.inputElements });
        this.setState({ residualElements: result.residualElements });
        this.setState({ resultElements: result.resultElements });
        this.setState({ flowBreakDown: result.flowBreakDown });
        this.setState({ maxFlow: result.maxFlow });
        if (result.sent) {
            this.setState({ isLoaded: true });
        }
    }

    render() {
        const { error, isLoaded, inputElements, residualElements, resultElements, flowBreakDown, maxFlow, style } = this.state;
        if (error && error.message) {
            return <ErrorPage message={error.message} />
        } else if (isLoaded) {
            return <LoadingPage />
        } else {
            return (
                <Container>
                    <Row className="pt-5">
                        <Col>
                            <h3>Max Flow is <b>{maxFlow.value}</b>  </h3>
                        </Col>
                    </Row>
                    <Row className="pt-5">
                        <Col>
                            <h2>Input Graph</h2>
                            <Graph elements={inputElements} style={style} />
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
                            <p>Flow 1 - <b>3->4->5->6</b> = 6</p>
                            <p>Flow 1 - <b>3->4->5->6</b> = 6</p>
                            <p>Flow 1 - <b>3->4->5->6</b> = 6</p>
                        </Col>
                    </Row>

                </Container>

            );
        }
    }
}