import React from "react";

import "./NavigationItem.scss";

function NavigationItem({
    title,
    selectedCallback = null,
    selected = false,
}) {
    const selectedClassName = (selected) ? "nav-item selected" : "nav-item";

    const handleSelect = () => {
        selectedCallback(title);
    };

    return (
        <div className={selectedClassName} onClick={handleSelect}>
            <div className="nav-item-title">{title}</div>
        </div>
    );
}

export default NavigationItem;
