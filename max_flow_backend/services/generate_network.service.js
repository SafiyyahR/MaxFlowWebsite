var WeightedGraph = require('../models/weightedGraph');
exports.generate_network = function (details) {
    if (!details.noNodes || !details.noEdges || !details.maxWeight) {
        return ({ message: "Insufficient Details Sent" });
    } else {
        var no_nodes = details.noNodes;
        var no_edges = details.noEdges;
        var max_weight = details.maxWeight;
        var error = true;
        while (error) {
            var added_nodes = new Set();
            var weightedGraph = new WeightedGraph(no_nodes, no_edges);
            error = false;
            for (let i = 0; i < no_nodes - 1; i++) {
                var end = Math.floor(Math.random() * no_nodes);
                var start = i;
                if (added_nodes.has(end) || end === 0 || end === start || ((end === (no_nodes - 1)) && (start === 0))) {
                    i--;
                } else {
                    var weight = Math.floor(Math.random() * max_weight + 1) + 1;
                    if (weightedGraph.addWeightedEdge(start, weight, end)) {
                        i--;
                    } else {
                        added_nodes.add(end);
                    }
                }
                if (!added_nodes.has(start) && start === (no_nodes - 2)) {
                    error = true;
                    break;
                }

            }
            if (!error) {
                var remaining_edges = no_edges - no_nodes + 1;
                for (let i = 0; i < remaining_edges; i++) {
                    var start = Math.floor(Math.random() * (no_nodes - 1));
                    var end = Math.floor(Math.random() * no_nodes);
                    if (end === 0 || end === start || ((end === (no_nodes - 1)) && (start === 0))) {
                        i--;
                    } else {
                        var weight = Math.floor(Math.random() * max_weight + 1) + 1;
                        if (weightedGraph.addWeightedEdge(start, weight, end)) {
                            i--;
                        }
                    }
                }
                return weightedGraph;
            }
        }
    }
}