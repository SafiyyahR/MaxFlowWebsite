import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import '../LoadingPage/LoadingPage.css'
export default class LoadingPage extends Component {

    render() {
        return (
            <div className="center-div text-center">

                <Spinner animation="border" className="loading-spinner" />

                <h2 className="pt-5">Loading...</h2>
            </div>

        );
    }
}