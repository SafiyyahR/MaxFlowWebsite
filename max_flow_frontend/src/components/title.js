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
                    { name: "author", content: "Safiyyah Thur Rahman" },
                    { name: "og:site_name", content: "MX flow" },
                    { name: "keywords", content: "Mx flow, Max Flow, Randomly generated flow network, Find Max Flow, Find Maximum Flow, File, Safiyyah Thur Rahman" }
                ]}
                link={[
                    {
                        "rel": "icon",
                        "type": "image/png",
                        "href": "./images/logo.png",
                        "sizes": "16x16"
                    }
                ]}
            ><meta name="google-site-verification" content="yBH6Jg106ZnMuXnSp_g65AH-JHEzy9ti72QibGWTqeo" /></Helmet>
        );
    }
}