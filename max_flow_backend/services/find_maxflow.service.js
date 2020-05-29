var WeightedGraph = require('../models/weightedGraph');

exports.calcMaxFlow = function (details) {
    if (!details.noNodes || !details.noEdges || !details.edgeArray) {
        return({ message: "Insufficient Details Sent" });
    } else {
        var weightedGraph = new WeightedGraph(details.noNodes);
        var array = details.edgeArray;
        for (let index = 0; index < array.length; index++) {
            var result = weightedGraph.addWeightedEdge(array[index][0], array[index][1], array[index][2]);
            if (result && result.isInvalid) {
                return result.message;
            }
        }
        var result = weightedGraph.findMaxFlow();
        return result;

    }
}