import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './scroll-to-top.css'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default class ScrollToTop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showBtn: false
        }
        this.scrollToTop = this.scrollToTop.bind(this);
        this.checkIfScrolled = this.checkIfScrolled.bind(this);
    }
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    checkIfScrolled() {
        var showBtn = this.state.showBtn;
        if (!this.state.showBtn && window.pageYOffset > window.screenY) {
            showBtn = true;
        } else if (this.state.showBtn && window.pageYOffset <= window.screenY) {
            showBtn = false;
        }
        this.setState({ showBtn });
    }
    componentDidMount() {
        window.addEventListener('scroll', this.checkIfScrolled);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.checkIfScrolled);
    }

    render() {
        const { showBtn } = this.state;
        return (
            <div className="custom-div-scroll-top">
                <Button className="custom-btn-scroll-top" type="button" onClick={this.scrollToTop} style={{ display: showBtn ? 'flex' : 'none' }}>
                    <FontAwesomeIcon className="custom-scroll-top" icon={faArrowUp} />
                </Button>
            </div>
        );
    }

}