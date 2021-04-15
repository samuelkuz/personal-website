const topologicalSort = (nodes, edges) => {
    // Kahn's Algorithm
    const animations = [];
    const graph = new Map();
    const queue = [];
    const sorted = [];
    let nodeCount = 0;

    // Add nodes
    nodes.forEach((val, key) => {
        nodeCount++;
        graph.set(
            key,
            {
                id: key,
                inDegree: 0,
                neighbors: []
            }
        );
    });

    edges.forEach((val, key) => {
        const src = val.srcId;
        const dest = val.destId;
        const srcNode = graph.get(src);
        const destNode = graph.get(dest);

        // Add edges
        if (srcNode !== undefined && destNode !== undefined) {
            destNode.inDegree++;
            srcNode.neighbors.push({
                dest: destNode
            });
        }
    });

    graph.forEach((node, key) => {
        if (node.inDegree == 0) {
            queue.push(node);
            animations.push({
                id: node.id,
                type: "all",
                color: "#7c94e4",
                name: node.id.toString(),
                edgeId: "",
            });
        }
    });

    while (queue.length > 0) {
        const currNode = queue.pop();

        if (currNode !== undefined) {
            sorted.push(currNode);

            animations.push({
                id: currNode.id,
                type: "all",
                color: "#e4e4e4",
                name: sorted.length.toString(),
                edgeId: "",
            });

            currNode.neighbors.forEach((e) => {
                const destNode = graph.get(e.dest.id);
                if (destNode !== undefined) {
                    destNode.inDegree = destNode.inDegree - 1;
                    
                    if (destNode.inDegree == 0) {
                        animations.push({
                            id: destNode.id,
                            type: "all",
                            color: "#7c94e4",
                            name: destNode.id.toString(),
                            edgeId: "",
                        });
                        queue.push(destNode);
                    }
                }
            });
        }
    }

    if (sorted.length !== nodeCount) console.log("ERROR: UNABLE TO BE FULLY BUILT, CYCLE DETECTED");

    return animations;
}

export default topologicalSort;