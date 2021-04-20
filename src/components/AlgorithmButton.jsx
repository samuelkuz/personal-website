import React from "react";

import "./AlgorithmButton.scss";

const AlgorithmButton = ({callBack, title}) => {
    const handleCallback = () => {
        callBack();
    };

    return (
        <div className="algorithm-button-container" onClick={() => handleCallback()}>
            <div className="algorithm-button-title">{title}</div>
        </div>

    );
}

export default AlgorithmButton;
