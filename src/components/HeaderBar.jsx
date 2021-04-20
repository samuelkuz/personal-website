import React from "react";
import { useHistory } from "react-router-dom";

import "./HeaderBar.scss";

function HeaderBar() {
    const history = useHistory();

    const handleOpenTab = (url) => {
        window.open(url, '_blank').focus();
    };

    const handleRedirect = (redirect) => {
        history.push(`/${redirect}`);
    };

    return (
        <div className="header-bar">
            <div className="header-container">
                <div className="header-title" onClick={() => handleRedirect("")}>samuel kuz</div>
                <div className="header-link-container">
                    <div className="header-link-item" onClick={() => handleOpenTab("https://github.com/samuelkuz/personal-website")}>github</div>
                    <div className="header-link-item" onClick={() => handleOpenTab("https://www.linkedin.com/in/samuel-kuznia-698bb8157/")}>linkedin</div>
                    <div className="header-link-item" onClick={() => handleRedirect("contact-me")}>contact me</div>
                </div>
            </div>
        </div>
    );
}

export default HeaderBar;
