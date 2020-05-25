module.exports=class Edge {
    constructor(start, weight, end) {
        this.start = start;
        this.weight = weight;
        this.end = end;
    }
    static cloneEdge(edge) {
        return new Edge(edge.start, edge.weight, edge.end);
    }

}