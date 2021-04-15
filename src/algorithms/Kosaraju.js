let nodeCount = 0;

const kosaraju = (nodes, edges) => {
    // Kahn's Algorithm
    const animations = [];
    const graph = new Map();

    // Add nodes
    nodes.forEach((val, key) => {
        graph.set(
            key,
            {
                id: key,
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
            srcNode.neighbors.push({
                dest: destNode
            });
        }
    });

    nodeCount = nodes.size;

    const stack = [];
    const visited = new Set();

    graph.forEach((node, key) => {
        if (!visited.has(key)) {
            fillOrder(node, visited, stack, animations);
        }
    });

    const transpose = getTranspose(nodes, edges, animations);

    visited.clear();

    let sccCount = 0;

    while (stack.length > 0) {
        const id = stack.pop();
        
        if (id !== undefined) {
            if (!visited.has(id)) {
                DFSUtil(id, visited, transpose, sccCount, animations);
                // console.log("----------------");
                sccCount++;
            }
        }
    }

    resetEdges(edges, animations);

    return animations;
}

const DFSUtil = (id,  visited, transpose, sccCount, animations) => {
    visited.add(id);
    // console.log(id);
    animations.push({
        id: id,
        type: "all",
        color: "#e4e4e4",
        name: sccCount.toString(),
        edgeId: "",
    });

    const currNode = transpose.get(id);

    if (currNode !== undefined) {
        currNode.neighbors.forEach((e) => {
            const destNode = e.dest;
            if (!visited.has(destNode.id)) {
                DFSUtil(destNode.id, visited, transpose, sccCount, animations);
            }
        });
    }
};

const fillOrder = (n, visited, stack, animations) => {
    visited.add(n.id);

    n.neighbors.forEach((e) => {
        const destNode = e.dest;
        if (!visited.has(destNode.id)) {
            fillOrder(destNode, visited, stack, animations);
        }
    });

    animations.push({
        id: n.id,
        type: "all",
        color: "#7c94e4",
        name: (nodeCount - stack.length).toString(),
        edgeId: "",
    });
    stack.push(n.id);
};

const getTranspose = (nodes, edges, animations) => {
    const tempGraph = new Map();

    nodes.forEach((val, key) => {
        tempGraph.set(
            key,
            {
                id: key,
                neighbors: []
            }
        );
    });

    // Transpose the edges
    edges.forEach((val, key) => {
        const src = val.srcId;
        const dest = val.destId;
        const srcNode = tempGraph.get(src);
        const destNode = tempGraph.get(dest);

        // Add edges
        if (srcNode !== undefined && destNode !== undefined) {
            const oldEdgeKey = `${srcNode.id}:${destNode.id}`;
            animations.push({
                id: 0,
                type: "transpose",
                color: "#000000",
                name: "",
                edgeId: oldEdgeKey,
            });
            destNode.neighbors.push({
                dest: srcNode
            });
        }
    });

    return tempGraph;
};

const resetEdges = (edges, animations) => {
    edges.forEach((val, key) => {
        const oldEdgeKey = `${val.destId}:${val.srcId}`;
        animations.push({
            id: 0,
            type: "transpose",
            color: "#000000",
            name: "",
            edgeId: oldEdgeKey,
        });
    });
};

export default kosaraju;