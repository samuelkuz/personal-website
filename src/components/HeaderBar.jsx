import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import CopyToast from "./CopyToast.jsx";

import "./HeaderBar.scss";

const internalLinks = [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/projects" },
    { label: "Contact", to: "/contact" },
];

const socialLinks = [
    { label: "GitHub", href: "https://github.com/samuelkuz" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/samuel-kuznia-698bb8157/" },
];

const EMAIL_ADDRESS = "samuelkuz@gmail.com";

function HeaderBar() {
    const [showToast, setShowToast] = useState(false);
    const hideToastTimeoutRef = useRef(null);

    const handleCopyEmail = async () => {
        await navigator.clipboard.writeText(EMAIL_ADDRESS);
        if (hideToastTimeoutRef.current !== null) {
            window.clearTimeout(hideToastTimeoutRef.current);
        }
        setShowToast(true);
        hideToastTimeoutRef.current = window.setTimeout(() => setShowToast(false), 1400);
    };

    return (
        <>
            <header className="site-header">
                <div className="site-header-inner surface-card">
                    <NavLink className="site-brand" to="/">
                        <span className="brand-mark"></span>
                        <span>Sam</span>
                    </NavLink>
                    <nav className="site-nav" aria-label="Primary navigation">
                        {internalLinks.map((entry) => (
                            <NavLink
                                key={entry.to}
                                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                                end={entry.to === "/"}
                                to={entry.to}
                            >
                                {entry.label}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="site-socials">
                        {socialLinks.map((entry) => (
                            <a
                                key={entry.label}
                                className="social-link"
                                href={entry.href}
                                rel="noreferrer"
                                target="_blank"
                            >
                                {entry.label}
                            </a>
                        ))}
                        <button className="social-link social-button" onClick={handleCopyEmail} type="button">
                            Email
                        </button>
                    </div>
                </div>
            </header>
            <CopyToast show={showToast} />
        </>
    );
}

export default HeaderBar;
