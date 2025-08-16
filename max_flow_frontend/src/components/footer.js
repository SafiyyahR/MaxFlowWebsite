import React, { Component } from 'react'
import './footer.css'
export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentYear: new Date().getFullYear()
        }
    }

    render() {
        const { currentYear } = this.state;
        return (
            <div className="footer-content text-center">
                <div className="p-2">© Copyright {currentYear}&nbsp;
                <a className="footer-link" target="_blank"
            without="true"
            rel="noopener noreferrer" href="https://www.linkedin.com/in/safiyyah-rahman/">Safiyyah-Thur Rahman</a>
                </div>
            </div >
        );
    }
}