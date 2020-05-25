var Edge = require('./edge');
module.exports = class WeightedGraph {
    constructor(nodes) {
        this.START_NODE = 0;
        this.FALSE_EDGE = new Edge(0, 0, 0);
        this.nodes = nodes;
        this.linkedAdjacencyList = [];
        this.resLinkedAdjacencyList = [];
        this.residualLinkedList = [];
        this.resultLinkedList = [];
        for (let index = 0; index < nodes; index++) {
            this.linkedAdjacencyList.push([]);
            this.resLinkedAdjacencyList.push([]);;
            this.residualLinkedList.push([]);
            this.resultLinkedList.push([]);
        }
        this.breakDownOfMaxFlow = [];
        //make an array to store the path found in the breadthFirstSearch which shows a path from the source to the sink
        this.pathIndex = [];
    }

    initialize(linkedList) {
        linkedList = [];
        for (let index = 0; index < nodes; index++) {
            linkedList.push([]);
        }
    }

    setLinkedList(linkedList, settingLinkedList) {
        for (let index = 0; index < settingLinkedList.length; index++) {
            var list = settingLinkedList[index];
            for (let index1 = 0; index1 < list.length; index1++) {
                var edge = list[index1];
                linkedList[edge.start].push(Edge.cloneEdge(edge));
            }
        }

    }
    isEdgeValid(start, weight, end, linkedList) {
        if ((start < this.nodes - 1) && start >= 0) {
            //the end node is checked if it is greater than 0 and less than the number of nodes.
            if ((end < this.nodes) && end > 0 && end != start) {
                //then the weight is checked if it is greater than zero
                if (weight > 0) {
                    //if all these conditions are met then is cross-checked if the edge exists in the linkedAdjacencyList using the findEdge method
                    var foundEdge = this.findEdge(start, end, linkedList);
                    //if the edge is equal to false_edge then the edge is added to the graph. If false_edge is returned then it means the edge doesn't exist.
                    if (foundEdge != null && foundEdge == this.FALSE_EDGE) {
                        //making an object of an edge
                        return new Edge(start, weight, end);
                    } else if (foundEdge != null) {
                        //this prints to user that an edge with this start and end node exists
                        return {"message":"There is a connection between node " + start + " and " + end + " created before."}
                    }
                } else {
                    //this prints to the user that the weight of an edge has to greater than zero
                    return {"message":"Weight of an edge must be greater than zero."}
                }
                //prints specific error messages
            } else if (end == 0) {
                return {"message":"Node 0 cannot be an end node."}
            } else if (start == end) {
                return {"message":"Start node and end node cannot be the same."}
            } else {
                return {"message":"Node " + end + " is not in the graph."}
            }
            //prints specific error messages
        } else if (start == this.nodes - 1) {
            return {"message":"Node " + (this.nodes - 1) + " cannot be a start node."}
        } else {
            return {"message":"Node " + start + " is not in the graph."}
        }
        //the method returns false if the user has entered anything incorrectly.
        return this.FALSE_EDGE;
    }

    addWeightedEdge(start, weight, end) {
        var edge = this.isEdgeValid(start, weight, end, this.linkedAdjacencyList);
        //if FALSE_EDGE has been returned then true is sent to indicate that the edge has not been added
        if (edge == null || edge == this.FALSE_EDGE) {
            return true;
        } else {
            //else the edge is added
            var innerArr = this.linkedAdjacencyList[start];
            innerArr.push(edge);
            this.linkedAdjacencyList[start] = innerArr;
            return false;
        }
    }
    printWeightedGraph(linkedList) {
        for (let index = 0; index < linkedList.length; index++) {
            var list = linkedList[index];
            for (let index1 = 0; index1 < list.length; index1++) {
                console.log(list[index1]);
            }

        }
    }

    findEdge(start, end, linkedList) {
        //it is checked if the start node is greater than 0
        if (start >= 0) {
            for (let index = 0; index < linkedList[start].length; index++) {
                var edge = linkedList[start][index];
                if (edge.end == end) {
                    return edge
                }
            }
            linkedList[start].forEach(edge => {
                if (edge.end == end) {
                    return edge
                }
            });
        }
        //if the edge doesnt exist then FALSE_EDGE
        return this.FALSE_EDGE;
    }
    findPathFromSourceToSink() {
        if (this.residualLinkedList[0].length != 0) {
            for (let index = 0; index < this.nodes; index++) {
                this.pathIndex.push(0);
            }
            //stores true or false if the node in the queue has been visited or not
            var hasVisited = [];
            for (let index = 0; index < this.nodes; index++) {
                hasVisited.push(false);
            }
            var queue = []
            //the source is the first node to be added to the queue for traversing
            queue.push(this.START_NODE);
            //once the node has been added to the queue then the element of the hasVisited array which has the index equal to the start node will be updated to true
            hasVisited[this.START_NODE] = true;
            //this array is used to store the path from which a flow from the source to the sink is being identified
            //the first element is always a rogue value - this indicates that there is no parent node for this
            this.pathIndex[this.START_NODE] = -1;
            var visitedFlag = false;
            //this loop runs till all elements in the queue have been visited
            while (queue.length != 0 && !visitedFlag) {
                //takes the first element from the queue
                var headOfQueue = queue.shift();
                //some elements in the residualLinkedList might not have any edges, the if condition is used to validate that
                if (this.residualLinkedList[headOfQueue].length != 0) {
                    //sorting the linkedList stored in residualLinkedList[headOfQueue] according to the end node
                    queue.sort(this.compareTo);
                    //go through each edge in the linkedList
                    for (let index = 0; index < this.residualLinkedList[headOfQueue].length; index++) {
                        var edge = this.residualLinkedList[headOfQueue][index];
                        //if the endNode is not visited and if the weight of the edge is greater
                        // than zero then it is added to the graph and the headOfQueue is added to the pathIndex, to show the path.
                        if (!hasVisited[edge.end] && edge.weight > 0) {
                            queue.push(edge.end);
                            hasVisited[edge.end] = true;
                            this.pathIndex[edge.end] = headOfQueue;
                            //found a path from the source to the sink then break
                            if (edge.end == this.nodes - 1) {
                                visitedFlag = true;
                                break;
                            }
                        }
                    }
                }
            }
            //return the value stored in the element of the hasVisited array which has an index equal to the source node's
            return hasVisited[this.nodes - 1];
        } else {
            return false;
        }
    }

    findMaxFlow() {
        //if the user is not updating or deleting an edge from then the linkedAdjacencyList is cloned to  masterLinkedAdjacencyList      
        this.breakDownOfMaxFlow = [];
        //clone the linkedAdjacencyList to residualLinkedList
        this.setLinkedList(this.residualLinkedList, this.linkedAdjacencyList);
        //initially the max flow is zero
        var max_flow = 0;
        //declaring the start and end variable
        var start, end;
        //if the value returned by the breadthFirstSearch() iw
        while (this.findPathFromSourceToSink()) {
            var individualBreakDown = [];
            //if true was returned then the minimum weight value of the path found must be identified
            var path_flow = Number.MAX_VALUE;
            //finding the minimum value from the path identified
            for (end = this.nodes - 1; end > this.START_NODE; end = this.pathIndex[end]) {
                //the value stored in the pathIndex[end] is the start of the edge between start and end
                start = this.pathIndex[end];
                //once the edge is found the weight is extracted and compared with the path_flow to find the minimum value
                var foundEdge = this.findEdge(start, end, this.residualLinkedList);
                var weight = foundEdge.weight;
                path_flow = Math.min(path_flow, weight);
                individualBreakDown.push(end);
            }
            individualBreakDown.push(end);
            individualBreakDown.push(path_flow);
            this.breakDownOfMaxFlow.push(individualBreakDown);
            //the path_flow is subtracted from the weight of the edges in the path identified from the breadthFirstSearch
            for (end = this.nodes - 1; end > this.START_NODE; end = this.pathIndex[end]) {
                //the value stored in the pathIndex[end] is the start of the edge between start and end
                start = this.pathIndex[end];
                //once the edge is found then the weight is subtracted by the path_flow
                var foundEdge = this.findEdge(start, end, this.residualLinkedList);
                foundEdge.weight = foundEdge.weight - path_flow;
            }
            //the path_flow is add to the max_flow
            max_flow += path_flow;
        }
        if (max_flow != 0) {
            //the result graph is found which gives the max flow
            this.setLinkedList(this.resLinkedAdjacencyList, this.residualLinkedList);
            this.findLinkedListResult();
            // console.log("The source - " + 0 + ".");
            // console.log("The sink - " + (this.nodes - 1) + ".");
            // console.log("The maximum possible flow is " + max_flow + ".");
            return { "source": 0, "sink": this.nodes - 1, max_flow, "residual": this.resLinkedAdjacencyList, "result": this.resultLinkedList, "original": this.linkedAdjacencyList, "breakDownOfFlow": this.breakDownOfMaxFlow };
        } else {
            return { "message": "Cannot find maximum possible flow as there is no connection between the sink and source." };
        }

    }

    findLinkedListResult() {
        //cloning the linkedAdjacencyList to resultLinkedList
        this.setLinkedList(this.resultLinkedList, this.linkedAdjacencyList);
        for (let i = 0; i < this.linkedAdjacencyList.length; i++) {
            //sort the linkedAdjacencyList, residualLinkedList, resultLinkedList
            this.linkedAdjacencyList[i].sort(this.compareTo);
            this.residualLinkedList[i].sort(this.compareTo);
            this.resultLinkedList[i].sort(this.compareTo);
            //for every element in the linkedList
            for (let j = 0; j < this.resultLinkedList[i].length; j++) {
                var k;
                //another loop is used to identify the corresponding edge from the residualLinkedList
                //loop 2
                for (k = 0; k < this.residualLinkedList[i].length; k++) {
                    //the end nodes must match
                    if (this.resultLinkedList[i][j].end == this.residualLinkedList[i][k].end) {
                        //once found it breaks from the loop 2
                        break;
                    }
                }
                //the minimum and the maximum weight between the edge of the resultLinkedList and the residualLinkedList is found
                var min = Math.min(this.resultLinkedList[i][j].weight, this.residualLinkedList[i][k].weight);
                var max = Math.max(this.resultLinkedList[i][j].weight, this.residualLinkedList[i][k].weight);
                //if the max and min values are the same or if the weight of the edge from the residualLinkedList is greater than the resultLinkedList then the edge is removed from all the LinkedLists
                if ((max - min) == 0 || (this.resultLinkedList[i][j].weight < this.residualLinkedList[i][k].weight)) {
                    this.resultLinkedList[i].splice(j, 1);
                    this.residualLinkedList[i].splice(k, 1);
                    this.linkedAdjacencyList[i].splice(j, 1);
                    //j is decreased as the loop has to go to the last element
                    j--;
                    // else if the weight of the edge from the residualLinkedList is not equal to zero then the max-min will give the result weight
                } else if (this.residualLinkedList[i][k].weight != 0) {
                    this.resultLinkedList[i][j].weight = max - min;
                }
                //if it is zero the value is the same in the resultLinkedList
            }
        }
    }

    displayBreakDownOfMaxFlowCalc() {
        for (let index = 0; index < this.breakDownOfMaxFlow.length; index++) {
            var outerList = this.breakDownOfMaxFlow[index];
            //find the index of 0 aka the source
            var indexOfSource = outerList.indexOf(0);
            //loop till i is 0 where 0 is the index of the arrayList which has the sink
            for (var i = indexOfSource; i >= 0; i--) {
                console.log(outerList.get(i));
                if (i == 0) {
                    console.log(" = ");
                } else {
                    console.log(" -> ");
                }
            }
            //print the path flow
            console.log(outerList[outerList.length - 1] + "\n");
        }
    }
    compareTo(edge1, edge2) {
        if (edge1.end > edge2.end) {
            return 1
        } else if (edge1.end < edge2.end) {
            return -1;
        }
        return 0;
    }

}