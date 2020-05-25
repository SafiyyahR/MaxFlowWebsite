var WeightedGraph = require('../models/weightedGraph');
exports.generate_network = function (no_nodes, no_edges, max_weight) {
    var added_nodes = new Set();
    var weightedGraph = new WeightedGraph(no_nodes);
    var error = true;
    while (error) {
        error = false;
        for (let i = 0; i < no_nodes - 1; i++) {
            var end = Math.floor(Math.random() * no_nodes);
            console.log(end, i);
            var start=i;
            if (added_nodes.has(end) || end == 0 || end == start ||(end == 5 && start == 0)) {
                i--;
            } else {
                added_nodes.add(end);
                var weight = Math.floor(Math.random() * max_weight + 1) + 1;
                if (weightedGraph.addWeightedEdge(start, weight, end)) {
                    i--;
                }
            }
            weightedGraph.printWeightedGraph(weightedGraph.linkedAdjacencyList);
            if (!added_nodes.has(start) && start == no_nodes - 2) {
                console.log("The node is left out");
                error = true;
                break;
            }

        }
        if (!error) {
            var remaining_edges = no_edges - no_nodes + 1;
            console.log({ remaining_edges })
            for (let i = 0; i < remaining_edges; i++) {
                var start = Math.floor(Math.random() * (no_nodes - 1));
                var end = Math.floor(Math.random() * no_nodes) + 1;
                console.log(end, start, "ndcjd");
                if (end == start || (end == 5 && start == 0)) {
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