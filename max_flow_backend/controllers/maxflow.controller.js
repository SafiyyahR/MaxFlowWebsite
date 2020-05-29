var maxflowService = require('../services/find_maxflow.service');

exports.findMaxFlow = function (request, response) {
    if (request.body != null) {
        var details = request.body;
        var result = maxflowService.calcMaxFlow(details);
        if (result && result.message) {
            return response.status(500).send(result);
        } else {
            return response.status(200).send(result);
        }
    } else {
        return response.status(500).send({ message: "No Details Sent" });
    }
}