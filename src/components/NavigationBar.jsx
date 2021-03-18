import React from "react";

import NavigationItem from "./NavigationItem.jsx";

import "./NavigationBar.scss";

function NavigationBar() {
    const navItems = [
        {title: "Home"},
        {title: "Algorithm Visualizer"},
        {title: "Drone Delivery System"},
    ];

    return (
        <div className="nav-bar-container">
            {navItems.map((entry) => {
                console.log(entry);
                return (
                    <NavigationItem key={Math.random() * 1000} title={entry.title}></NavigationItem>
                )
            })}
        </div>
    );
}

export default NavigationBar;
