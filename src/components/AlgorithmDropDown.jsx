import React, { useState, useRef } from "react";

import "./AlgorithmDropDown.scss";

const AlgorithmDropDown = ({algorithmCallback, title}) => {
    const [showDropDown, setShowDropDown] = useState(false);

    const startAlgorithmRef = useRef(null);

    const buildDropDown = () => {
        return (
            <div className="drop-down-container">
                <div className="drop-down-input-container">
                    <div className="drop-down-input-title">From Node ID:</div>
                    <input className="drop-down-input-box" ref={startAlgorithmRef}></input>
                </div>
                <div className="drop-down-submit" onClick={() => handleStartAlgorithm()}>Start</div>
            </div>
        );
    };

    const handleStartAlgorithm = () => {
        if (startAlgorithmRef.current !== null && startAlgorithmRef.current.value.length > 0) {
            const startId = parseInt(startAlgorithmRef.current.value);
            startAlgorithmRef.current.value = "";
            setShowDropDown(false);
            algorithmCallback(startId);
        }
    };
    
    return (
        <div className="drop-down-button-container">
            <div className="drop-down-button-title" onClick={() => setShowDropDown(!showDropDown)}>{title}</div>
            {showDropDown &&
                buildDropDown()
            }
        </div>
    );
}

export default AlgorithmDropDown;
