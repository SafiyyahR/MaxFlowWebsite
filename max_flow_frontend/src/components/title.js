import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
export default class Title extends Component {
    constructor(props) {
        super(props)
        var title = this.props.title;
        if (title == null) {
            title = "Error | OCS CMB";
        }
        this.state = {
            title: title
        }
    }

    render() {
        const { title } = this.state;
        return (
            <Helmet
                title={title}
                meta={[
                    { name: "author", content: "Safiyyah Thur Rahman" }
                ]}
                link={[
                    {
                        "rel": "icon",
                        "type": "image/png",
                        "href": "./images/logo.png",
                        "sizes": "16x16"
                    }
                ]}
            />
        );
    }
}