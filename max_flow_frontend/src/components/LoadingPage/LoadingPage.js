import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import '../LoadingPage/LoadingPage.css'
import { Helmet } from 'react-helmet'
import { Col } from 'react-bootstrap'
export default class LoadingPage extends Component {
    title = "Loading | MX flow"
    render() {
        return (
            <div className="center-div text-center">
                <Helmet>
                    <title>{this.title}</title>
                    <link rel="icon" href="images/logo.png" sizes="16x16"></link>
                </Helmet>
                <Col lg={{ span: 8, offset: 2 }}>
                    <Spinner animation="border" className="loading-spinner" />

                    <h2 className="pt-5">Loading...</h2>
                </Col>
            </div>

        );
    }
}