import React, { useRef } from "react";

import "./GraphNode.scss";


const GraphNode = ({data, color, editCallback}) => {
    const circleRef = useRef(null);

    const handleShowEdit = () => {
        if (circleRef.current != null) {
            const location = circleRef.current.getBoundingClientRect();

            const offsetPoint = {
                x: location.left,
                y: location.top,
            };

            editCallback(offsetPoint, data.id);
        }
    }

    const tempStyle = {
        fill: color,
    };

    const calculateTextStyle = () => {
        let tempFontSize = "14px";
        if (parseInt(data.name) > 99) {
            tempFontSize = "10px";
        }
        if (parseInt(data.name) > 999) {
            tempFontSize = "8px";
        }

        return {
            fontSize: tempFontSize,
        }
    };

    const calculateDy = () => {
        let tempDy = 2;
        if (parseInt(data.name) > 99) {
            tempDy = 3;
        }
        if (parseInt(data.name) > 999) {
            tempDy = 4;
        }
        
        return tempDy;
    };

    return (
        <React.Fragment>
            <circle className="node-circle" ref={circleRef} cx={data.point.x} cy={data.point.y} r={data.size} style={tempStyle} onClick={() => handleShowEdit()}/>
            <text className="node-text" x={data.point.x} y={data.point.y} dy={data.size/calculateDy()} style={calculateTextStyle()} onClick={() => handleShowEdit()}>{data.name}</text>
        </React.Fragment>
    );
}

export default GraphNode;
