import React, { Component } from 'react'
import { Col, Row, Button, Modal } from 'react-bootstrap'
export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.onHide(false);
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={this.closeModal} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3>File Format</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg={{ span: 10, offset: 2 }}>
                            <img src="./images/fileFormat.png" className="img-fluid" alt="file format to be uploaded" />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                        Close
            </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}