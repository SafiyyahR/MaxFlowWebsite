import React, { Component } from 'react'
import { Spinner, Col } from 'react-bootstrap'
import '../external-stylesheet.css'
import Title from '../components/title'
export default class Loading extends Component {
    title = "Loading | MX flow"
    render() {
        const screenHeight = window.screen.height + "px";
        return (
            <div style={{ minHeight: screenHeight }} className="center-div text-center">
                <Title title={this.title} />
                <Col lg={{ span: 8, offset: 2 }}>
                    <Spinner animation="border" className="loading-spinner" />

                    <h2 className="pt-5">Loading...</h2>
                </Col>
            </div>

        );
    }
}