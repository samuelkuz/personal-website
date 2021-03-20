import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import NavigationItem from "./NavigationItem.jsx";

import "./NavigationBar.scss";

function NavigationBar() {
    const [navItems, setNavItems] = useState([
        {title: "Home", selected: false, redirect: ""},
        {title: "Algorithm Visualizer", selected: false, redirect: "algorithm-visualizer"},
        {title: "Drone Delivery System", selected: false, redirect: "drone-delivery-system"},
        {title: "Contact Me", selected: false, redirect: "contact-me"},
    ]);

    useEffect(() => {
        initializeSelect();
    }, []);
    
    const history = useHistory();

    // Can refactor this to use redux store
    const initializeSelect = () => {
        const pageTitle = window.location.href.split("/")[3].replaceAll("-", " ");
        const tempNavItems = JSON.parse(JSON.stringify(navItems));

        console.log(pageTitle);
        if (pageTitle === "") {
            tempNavItems[0].selected = true;
        } else {
            for (let navItem of tempNavItems) {
                if (navItem.title.toLowerCase().indexOf(pageTitle) !== -1) {
                    navItem.selected = true;
                }
            }
        }

        setNavItems(tempNavItems);
    };

    const handleSelect = (title) => {
        const tempNavItems = JSON.parse(JSON.stringify(navItems));
        let redirect = "";

        for (let navItem of tempNavItems) {
            if (navItem.title.indexOf(title) !== -1) {
                navItem.selected = true;
                redirect = navItem.redirect;
            } else {
                navItem.selected = false;
            }
        }

        setNavItems(tempNavItems);
        history.push(`/${redirect}`);
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
