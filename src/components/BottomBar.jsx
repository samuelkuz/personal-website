import React, { useState, useEffect } from "react";

import github_icon from "../assets/github_icon.png";

import "./BottomBar.scss";

function BottomBar() {
    useEffect(() => {

    }, []);
    
    return (
        <div className="bottom-bar-container">
            <img className="github-icon" src={github_icon} alt="github" />
        </div>
    );
}

export default BottomBar;
