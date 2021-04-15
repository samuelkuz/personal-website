import React, { useEffect, useRef, useState } from "react";

import AlgorithmButton from "../components/AlgorithmButton";
import AlgorithmDropDown from "../components/AlgorithmDropDown";
import Edge from "../components/Edge";
import GraphNode from "../components/GraphNode";

import dijkstra from "../algorithms/Dijkstra";
import kosaraju from "../algorithms/Kosaraju";
// import topologicalSort from "../algorithms/TopologicalSort";

import "./GraphVisualizer.scss";

function GraphVisualizer({height, width}) {
    const [addNodePoint, setAddNodePoint] = useState({x: 0, y: 0});
    const [animations, setAnimations] = useState([]);
    const [animationSpeed, setAnimationSpeed] = useState(200);
    const [edgeCounter, setEdgeCounter] = useState(0);
    const [edgeMap, setEdgeMap] = useState(new Map());
    const [editEdgePoint, setEditEdgePoint] = useState({x: 0, y: 0});
    const [editNodePoint, setEditNodePoint] = useState({x: 0, y: 0});
    const [nodeCounter, setNodeCounter] = useState(0);
    const [nodeMap, setNodeMap] = useState(new Map());
    const [renderCount, setRenderCount] = useState(0);
    const [selectedEdge, setSelectedEdge] = useState("");
    const [selectedNode, setSelectedNode] = useState(0);
    const [showAddNode, _setShowAddNode] = useState(false);
    const [showEditEdge, _setShowEditEdge] = useState(false);
    const [showEditNode, _setShowEditNode] = useState(false);
    const [svgAddNodePoint, setSvgAddNodePoint] = useState({x: 0, y: 0});
    const [viewPt, _setViewPt] = useState({x: 0, y: 0});
    const [zoom, _setZoom] = useState(150);

    useEffect(() => {
        window.addEventListener("keydown", handleMovement);
        window.addEventListener("click", handleClick);

        // Data to start and toy around with
        nodeMap.set(1, {id: 1, color: "#919191", name: "1", point: {x: 10, y: 10}, size: 10});
        nodeMap.set(2, {id: 2, color: "#919191", name: "2", point: {x: 30, y: 30}, size: 10});
        nodeMap.set(3, {id: 3, color: "#919191", name: "3", point: {x: 60, y: 30}, size: 10});
        nodeMap.set(4, {id: 4, color: "#919191", name: "4", point: {x: 100, y: 40}, size: 10});
        nodeMap.set(5, {id: 5, color: "#919191", name: "5", point: {x: 40, y: 100}, size: 10});
        nodeMap.set(6, {id: 6, color: "#919191", name: "6", point: {x: 80, y: 75}, size: 10});
        nodeMap.set(7, {id: 7, color: "#919191", name: "7", point: {x: 90, y: 100}, size: 10});

        edgeMap.set("1:2", {srcId: 1, srcPoint: {x: 10, y: 10}, destId: 2, destPoint: {x: 30, y: 30}, weight: 28.284271247461902});
        edgeMap.set("2:3", {srcId: 2, srcPoint: {x: 30, y: 30}, destId: 3, destPoint: {x: 60, y: 30}, weight: 30});
        edgeMap.set("3:4", {srcId: 3, srcPoint: {x: 60, y: 30}, destId: 4, destPoint: {x: 100, y: 40}, weight: 41.23105625617661});
        edgeMap.set("4:6", {srcId: 4, srcPoint: {x: 100, y: 40}, destId: 6, destPoint: {x: 80, y: 75}, weight: 40.311288741492746});
        edgeMap.set("6:5", {srcId: 6, srcPoint: {x: 80, y: 75}, destId: 5, destPoint: {x: 40, y: 100}, weight: 47.16990566028302});
        edgeMap.set("6:7", {srcId: 6, srcPoint: {x: 80, y: 75}, destId: 7, destPoint: {x: 90, y: 100}, weight: 26.92582403567252});
        
        setEdgeCounter(6);
        setNodeCounter(7);

        return function cleanup() {
            window.removeEventListener("keydown", handleMovement);
            window.removeEventListener("click", handleClick);
        }
    }, []);

    useEffect(() => {
        if (animations.length > 0) {
            const tempAnimations = [ ...animations ];
            const tempAnimationData = tempAnimations.shift();
            if (tempAnimationData === undefined) return;
            const animation = tempAnimationData;
            switch (animation.type) {
                case "color":
                    setTimeout(() => {
                        const node = nodeMap.get(animation.id);
                        if (node === undefined) return;
                        node.color = animation.color;
                        setAnimations(tempAnimations);
                    }, animationSpeed);
                    break;
                case "name":
                    setTimeout(() => {
                        const node = nodeMap.get(animation.id);
                        if (node === undefined) return;
                        node.name = animation.name;
                        setAnimations(tempAnimations);
                    }, animationSpeed);
                    break;
                case "transpose":
                    setTimeout(() => {
                        transposeEdge(animation.edgeId);
                        setAnimations(tempAnimations);
                    }, animationSpeed / 2);
                    break;
                case "all":
                    setTimeout(() => {
                        const node = nodeMap.get(animation.id);
                        if (node === undefined) return;
                        node.color = animation.color;
                        node.name = animation.name;
                        setAnimations(tempAnimations);
                    }, animationSpeed);
                    break;
            }
        }
    }, [animations]);

    const addEdgeInputRef = useRef(null);
    const showEditEdgeRef = useRef(showEditEdge);
    const showEditNodeRef = useRef(showEditNode);
    const svgRef = useRef(null);
    const showAddNodeRef = useRef(showAddNode);
    const viewPtRef = useRef(viewPt);
    const zoomRef = useRef(zoom);

    const setShowAddNode = (data) => {
        showAddNodeRef.current = data;
        _setShowAddNode(data);
    };

    const setShowEditEdge = (data) => {
        showEditEdgeRef.current = data;
        _setShowEditEdge(data);
    };

    const setShowEditNode = (data) => {
        showEditNodeRef.current = data;
        _setShowEditNode(data);
    };

    const setViewPt = (data) => {
        viewPtRef.current = data;
        _setViewPt(data);
    };

    const setZoom = (num) => {
        zoomRef.current = num;
        _setZoom(num);
    };

    const buildAddNode = () => {
        return (
        <div className="add-node-container" style={calculateAddNodeStyle()}>
            <div className="add-node-title">Add Node:</div>
            <div className="add-node-submit" onClick={() => handleAddNode()}>Create</div>
        </div>
        );
    };
    
    const buildEditNode = () => {
        return (
        <div className="edit-node-container" style={calculateEditNodeStyle()}>
            <div className="edit-node-title">Edit Node</div>
            <div className="add-edge-container">
                <div className="add-edge-title">Edge to:</div>
                <input className="input-box" ref={addEdgeInputRef}></input>
            </div>
            <div className="edit-node-submit" onClick={() => handleAddEdge()}>Add Edge</div>
            <div className="edit-node-submit" onClick={() => handleDeleteNode()}>Delete</div>
        </div>
        );
    };

    const buildEditEdge = () => {
        return (
        <div className="edit-edge-container" style={calculateEditEdgeStyle()}>
            <div className="edit-edge-title">Edit Edge:</div>
            <div className="edit-edge-submit" onClick={() => handleDeleteEdge()}>Delete</div>
        </div>
        );
    };
    
    const buildEdges = () => {
        const edgeObjs = [];
        edgeMap.forEach((val, key) => {
            // Eventually calculate if it should be rendered or not
            edgeObjs.push(<Edge key={Math.random() * 10000} data={val} color={"#000"} editCallback={handleEditEdge}/>);
        });

        return edgeObjs;
    };

    const buildNodes = () => {
        const nodeObjs = [];
        nodeMap.forEach((val, key) => {
            // Eventually calculate if it should be rendered or not
            nodeObjs.push(<GraphNode key={Math.random() * 10000} data={val} color={val.color} editCallback={handleEditNode}/>);
        });

        return nodeObjs;
    };

    const buildSettings = () => {
        return (
            <div className="algorithm-selector-container">
                <AlgorithmDropDown title={"Dijkstra's"} algorithmCallback={handleDijkstra}/>
                <AlgorithmButton title={"Topological Sort"} callBack={handleDijkstra}/>
                <AlgorithmButton title={"Kosaraju"} callBack={handleKosaraju}/>
                <AlgorithmButton title={"Reset ID's"} callBack={handleReset}/>
            </div>);
    };

    const calculateAddNodeStyle = () => {
        const style = {
            left: addNodePoint.x,
            top: addNodePoint.y - 25,
        };

        return style;
    };

    const calculateEditEdgeStyle = () => {
        const style = {
            left: editEdgePoint.x,
            top: editEdgePoint.y,
        };

        return style;  
    };

    const calculateEditNodeStyle = () => {
        const style = {
            left: editNodePoint.x,
            top: editNodePoint.y + 25,
        };

        return style;  
    };

    const handleAddNode = () => {
        const nextId = nodeCounter + 1;
        const nextNodeName = `${nextId}`;

        const newNode = {
            id: nextId,
            color: "#919191",
            name: nextNodeName,
            point: {
                x: svgAddNodePoint.x,
                y: svgAddNodePoint.y
            },
            size: 10,
        };

        nodeMap.set(nextId, newNode);
        setNodeCounter(nextId);
        setShowAddNode(false);
    };

    const handleAddEdge = () => {
        if (addEdgeInputRef.current !== null && addEdgeInputRef.current.value.length > 0) {
            const srcId = selectedNode;
            const destId = parseInt(addEdgeInputRef.current.value);
            const edgeKey = `${srcId}:${destId}`;

            if (!edgeMap.has(edgeKey) && !(srcId === destId)) {
                const srcNode = nodeMap.get(srcId);
                const destNode = nodeMap.get(destId);
                if (srcNode !== undefined && destNode !== undefined) {
                    const srcPoint = srcNode.point;
                    const destPoint = destNode.point;
                    const weight = Math.sqrt(Math.pow(srcPoint.x - destPoint.x, 2) + Math.pow(srcPoint.y - destPoint.y, 2));
                    const edgeData = {srcId: srcId, destId: destId, srcPoint: srcPoint, destPoint: destPoint, weight: weight};

                    edgeMap.set(edgeKey, edgeData);
                    setEdgeCounter(edgeCounter + 1);
                    setShowEditNode(false);
                }
            }
        }
    }

    const handleClick = (e) => {
        if (svgRef.current !== null) {
            const svgPt = svgRef.current.createSVGPoint();
            svgPt.x = e.clientX;
            svgPt.y = e.clientY;
            const cursorPt = svgPt.matrixTransform(svgRef.current.getScreenCTM()?.inverse());

            // Show add node screen
            if (e.target instanceof SVGSVGElement) {
                if (showEditNodeRef.current) {
                    setShowEditNode(false);
                    return;
                }
                if (showEditEdgeRef.current) {
                    setShowEditEdge(false);
                    return;
                }

                if (!showAddNodeRef.current) {
                    const clickedPt = {
                        x: e.clientX,
                        y: e.clientY
                    }
    
                    const svgPt = {
                        x: cursorPt.x,
                        y: cursorPt.y
                    };

                    setSvgAddNodePoint(svgPt);
                    setAddNodePoint(clickedPt);
                    setShowAddNode(true);
                } else {
                    setShowAddNode(false);
                }
            } else {
                setShowAddNode(false);
            }
        }
    };

    const handleDeleteEdge = () => {
        edgeMap.delete(selectedEdge);
        setShowEditEdge(false);
    };

    const handleDeleteNode = () => {
        const removeEdges = [];
        edgeMap.forEach((val, key) => {
            // Delete any edges including deleted node
            if (selectedNode === val.srcId || selectedNode === val.destId) {
                edgeMap.delete(key);
            }
        });

        nodeMap.delete(selectedNode);
        setShowEditNode(false);
    };

    const handleDijkstra = (srcId) => {
        const tempAnimations = dijkstra(srcId, nodeMap, edgeMap);
        setAnimations(tempAnimations);
    };

    const handleEditNode = (offset, id) => {
        setShowAddNode(false);
        setShowEditEdge(false);
        setSelectedNode(id);
        setEditNodePoint(offset);
        setShowEditNode(true);
    };

    const handleEditEdge = (offset, id) => {
        setShowAddNode(false);
        setShowEditNode(false);
        setSelectedEdge(id);
        setEditEdgePoint(offset);
        setShowEditEdge(true);
    };

    const handleKosaraju = () => {
        const tempAnimations = kosaraju(nodeMap, edgeMap);
        setAnimations(tempAnimations);
    };

    const handleMovement = (e) => {
        const temp = { ...viewPtRef.current };
        switch(e.code) {
            // Up
            case "ArrowUp":
                temp.y -= 10;
                setViewPt(temp);
                break;
            // Down
            case "ArrowDown":
                temp.y += 10;
                setViewPt(temp);
                break;
            // Right
            case "ArrowRight":
                temp.x += 10;
                setViewPt(temp);
                break;
            // Left
            case "ArrowLeft":
                temp.x -= 10;
                setViewPt(temp);
                break;
            case "KeyZ":
                setZoom(zoomRef.current - 20);
                break;
            case "KeyX":
                setZoom(zoomRef.current + 20);
                break;
        }
    };

    const handleReset = () => {
        nodeMap.forEach((val, key) => {
            val.color = "#919191";
            val.name = val.id.toString();
        });
        setRenderCount(renderCount + 1);
    };

    // const handleTopologicalSort = () => {
    //     const tempAnimations = topologicalSort(nodeMap, edgeMap);
    //     setAnimations(tempAnimations);
    // };

    const transposeEdge = (edgeId) => {
        const edge = edgeMap.get(edgeId);
        if (edge === undefined) return;
        const newKey = `${edge.destId}:${edge.srcId}`;
        const newEdge = {
            srcId: edge.destId,
            srcPoint: edge.destPoint,
            destId: edge.srcId,
            destPoint: edge.srcPoint,
            weight: edge.weight,
        };

        edgeMap.delete(edgeId);
        edgeMap.set(newKey, newEdge);
    };


    return (
        <div className="map-wrapper">
            { buildSettings() }
            <svg className="map" viewBox={`${viewPt.x} ${viewPt.y} ${zoom} ${zoom}`} ref={svgRef}>
                {buildEdges()}
                {buildNodes()}
            </svg>
            {showAddNode &&
                buildAddNode()
            }
            {showEditNode &&
                buildEditNode()
            }
            {showEditEdge &&
                buildEditEdge()
            }
        </div>
    );
}

export default GraphVisualizer;
