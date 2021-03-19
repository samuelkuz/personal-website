import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import NavigationItem from "./NavigationItem.jsx";

import "./NavigationBar.scss";

function NavigationBar() {
    const [navItems, setNavItems] = useState([
        {title: "Home", selected: false},
        {title: "Algorithm Visualizer", selected: false},
        {title: "Drone Delivery System", selected: false},
    ]);

    useEffect(() => {
        initializeSelect();
    }, []);
    
    const history = useHistory();

    // Can refactor this to use redux store
    const initializeSelect = () => {
        const pageTitle = window.location.href.split("/")[3].replaceAll("-", " ");
        const tempNavItems = JSON.parse(JSON.stringify(navItems));
        let found = false;

        for (let navItem of tempNavItems) {
            if (navItem.title.indexOf(pageTitle) !== -1) {
                navItem.selected = true;
                found = true;
            }
        }

        if (!found) tempNavItems[0].selected = true;
        setNavItems(tempNavItems);
    };

    const handleSelect = (title) => {
        const noSpacesTitle = title.replaceAll(" ", "-");
        const tempNavItems = JSON.parse(JSON.stringify(navItems));
        let found = false;

        for (let navItem of tempNavItems) {
            if (navItem.title.indexOf(title) !== -1) {
                navItem.selected = true;
                found = true;
            } else {
                navItem.selected = false;
            }
        }

        if (!found) tempNavItems[0].selected = true;

        setNavItems(tempNavItems);
        history.push(`/${noSpacesTitle}`);
    };

    return (
        <div className="nav-bar-container">
            {navItems.map((entry, idx) => {
                return (
                    <NavigationItem key={Math.random() * 1000} title={entry.title} selectedCallback={handleSelect} selected={navItems[idx].selected}></NavigationItem>
                )
            })}
        </div>
    );
}

export default NavigationBar;
