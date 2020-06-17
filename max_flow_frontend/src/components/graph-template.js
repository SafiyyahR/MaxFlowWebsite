import React, { Component } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: props.elements,
            style: props.style,
            stylesheet: [
                {
                    selector: 'node',
                    style: {
                        width: 50,
                        height: 50,
                        shape: 'circle',
                        label: 'data(label)',
                        'text-valign': 'center',
                        'background-color': '#8ad6f2'

                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        label: 'data(label)',
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier'
                    }
                }
            ],
            minZoom: 0.5,
            maxZoom: 1.5

        };
    }

    render() {
        return (
            <div>
                <CytoscapeComponent
                    elements={this.state.elements}
                    style={this.state.style}
                    stylesheet={this.state.stylesheet}
                    minZoom={this.state.minZoom}
                    maxZoom={this.state.maxZoon}
                    cy={(cy) => { this.cy = cy }}
                />
            </div>
        );
    }
}