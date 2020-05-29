var generate_networkService = require('../services/generate_network.service');

exports.findMaxFlow = function (request, response) {
    if (request.body != null) {
        var details = request.body;
        var result = generate_networkService.generate_network(details);
        if (result && result.message) {
            return response.status(500).send(result);
        } else {
            var maxFlowResults = result.findMaxFlow();
            if (maxFlowResults && maxFlowResults.message) {
                return response.status(500).send(maxFlowResults);
            } else {
                return response.status(200).send(maxFlowResults);
            }
        }
    } else {
        return response.status(500).send({ message: "No Details Sent" });
    }
}