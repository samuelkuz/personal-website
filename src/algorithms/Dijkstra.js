const priorityQueue = () => {
    let heap = [];

    const parent = (index) => Math.floor((index - 1) / 2);
    const left = (index) => 2 * index + 1;
    const right = (index) => 2 * index + 2;
    const hasLeft = (index) => left(index) < heap.length;
    const hasRight = (index) => right(index) < heap.length;

    const swap = (a, b) => {
        const temp = heap[a];
        heap[a] = heap[b];
        heap[b] = temp;  
    }

    return {
        insert: (item) => {
            heap.push(item);

            let i = heap.length - 1;

            while (i > 0) {
                const p = parent(i);

                if (heap[p].distance < heap[i].distance) break;
                swap(i, p);
                i = p;
            }
        },

        peek: () => {
            if (heap.length === 0) {
                return null
            } else {
                return heap[0];
            }
        },

        pop: () => {
            if (heap.length === 0) return null;

            swap(0, heap.length - 1);
            const item = heap.pop();

            let current = 0;
            while (hasLeft(current)) {
                let smallerChild = left(current);
                if (hasRight(current) && (heap[right(current)].distance < heap[left(current)].distance)) {
                    smallerChild = right(current);
                }

                if (heap[smallerChild].distance > heap[current].distance) break;

                swap(current, smallerChild);
                current = smallerChild;
            }

            return (item !== undefined) ? item: null;
        },

        size: () => {
            return heap.length;
        },

        isEmpty: () => {
            return (heap.length === 0); 
        }
    };
}

const dijkstra = (srcId, nodes, edges) => {
    const animations = [];
    const graphNodes = new Map();
    const distMap = new Map();
    const visited = new Set();

    // Add nodes
    nodes.forEach((val, key) => {
        graphNodes.set(
            key,
            {
                id: key,
                neighbors: []
            }
        );

        distMap.set(key, Number.POSITIVE_INFINITY);
    });

    edges.forEach((val, key) => {
        const src = val.srcId;
        const dest = val.destId;
        const srcNode = graphNodes.get(src);
        const destNode = graphNodes.get(dest);

        // Add edges
        if (srcNode !== undefined && destNode !== undefined) { 
            srcNode.neighbors.push({
                dest: destNode,
                weight: val.weight,    
            });
        }
    });

    // console.log(graphNodes, distMap, visited);
    
    const prioQ = priorityQueue();

    distMap.set(srcId, 0);
    prioQ.insert({id: srcId, distance: 0});

    while (!prioQ.isEmpty()) {
        const temp = prioQ.pop();
        
        if (temp !== null) {
            visited.add(temp.id);
            const currNode = graphNodes.get(temp.id);
            const currWeight = distMap.get(temp.id);

            animations.push({
                id: temp.id,
                type: "all",
                color: "#e4e4e4",
                name: Math.floor((currWeight !== undefined) ? currWeight : temp.distance).toString(),
                edgeId: "",
            });

            if (currNode !== undefined && currWeight !== undefined) {
                currNode.neighbors.forEach((e) => {
                    const destId = e.dest.id;
                    if (!visited.has(destId)) {
                        const nextPossibleWeight = currWeight + e.weight;
                        // any to get rid of annoying undefined check
                        const oldLowestWeight = (distMap.has(destId)) ? distMap.get(destId) : Number.POSITIVE_INFINITY;

                        if (nextPossibleWeight < oldLowestWeight) {
                            distMap.set(destId, nextPossibleWeight);
                            animations.push({
                                id: destId,
                                type: "all",
                                color: "#7c94e4",
                                name: Math.floor(nextPossibleWeight).toString(),
                                edgeId: "",
                            });
                            prioQ.insert({
                                id: destId,
                                distance: nextPossibleWeight
                            });
                        }
                    }
                });
            }
        }
    }
    
    console.log(distMap);
    
    return animations;
};

export default dijkstra;