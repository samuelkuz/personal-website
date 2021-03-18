import React from "react";
import { useHistory } from "react-router-dom";

import "./NavigationItem.scss";

function NavigationItem({title}) {
    const history = useHistory();

    const handleClick = () => {
        const noSpacesTitle = title.replaceAll(" ", "-");

        history.push(`/${noSpacesTitle}`);
    };

    return (
        <div className="nav-item" onClick={handleClick}>
            <div className="nav-item-title">{title}</div>
        </div>
    );
}

export default NavigationItem;
