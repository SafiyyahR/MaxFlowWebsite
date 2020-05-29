import React, { Component } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
export default class Graph extends Component {
    // [
    //     { data: { id: '1', label: '1' }, position: { x: 150, y: 50 } },
    //     { data: { id: '3', label: '3' }, position: { x: 250, y: 50 } },
    //     { data: { id: '2', label: '2' }, position: { x: 150, y: 250 } },
    //     { data: { id: '4', label: '4' }, position: { x: 250, y: 250 } },
    //     { data: { id: '5', label: '5' }, position: { x: 150, y: 150 } },
    //     { data: { id: 'source', label: 'source' }, position: { x: 50, y: 150 } },
    //     { data: { id: 'sink', label: 'sink' }, position: { x: 350, y: 150 } },
    //     { data: { source: 'source', target: '2', label: '8' } },
    //     { data: { source: 'source', target: '1', label: '10' } },
    //     { data: { source: '1', target: '2', label: '5' } },
    //     { data: { source: '1', target: '3', label: '4' } },
    //     { data: { source: '2', target: '1', label: '4' } },
    //     { data: { source: '2', target: '4', label: '10' } },
    //     { data: { source: '3', target: 'sink', label: '4' } },
    //     { data: { source: '3', target: '2', label: '7' } },
    //     { data: { source: '3', target: '4', label: '6' } },
    //     { data: { source: '4', target: '3', label: '10' } },
    //     { data: { source: '4', target: 'sink', label: '14' } },
    //     { data: { source: '4', target: '5', label: '10' } },
    //     { data: { source: '5', target: 'sink', label: '14' } },
    // ]

    constructor(props) {
        super(props);
        this.state = {
            elements: {},
            style: {},
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
            maxZoon: 2.0

        };
        this.setState({ elements: props.elements });
        this.setState({ style: props.style });
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
            </div>);


    }
}