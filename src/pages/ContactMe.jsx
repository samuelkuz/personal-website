import React, { useState, useEffect, useRef } from "react";

import github_icon_large from "../assets/github_icon_large.png";
import linkedin from "../assets/linkedin.png";

import "./ContactMe.scss";

function ContactMe() {
    const [showCopy, setShowCopy] = useState(false);
    
    let emailInfo = "email: samuelkuz@gmail.com";
    let phoneInfo = "phone: 626-375-5731";

    const emailRef = useRef();

    const handleCopy = () => {
        navigator.clipboard.writeText("samuelkuz@gmail.com");
        console.log(emailRef.current.getBoundingClientRect());
        setShowCopy(true);
        setTimeout(() => {
            setShowCopy(false);
        }, 600);
    };

    const calculatePopUpStyle = () => {
        const style = {
            left: emailRef.current.getBoundingClientRect().x + 90,
            top: emailRef.current.getBoundingClientRect().y - 25,
        };

        return style;
    }

    return (
        <div className="contact-wrapper">
            <div className="contact-header">
                Contact Information
            </div>
            {showCopy &&
                <div className="copy-popup" style={calculatePopUpStyle()}>Copied to clipboard!</div>}
            <div className="contact-container">
                <div className="contact-item clickable" ref={emailRef} onClick={() => handleCopy()}>{emailInfo}</div>
                <div className="contact-item">{phoneInfo}</div>
            </div>
            <div className="icon-container">
                <div className="icon-item" onClick={() => window.open("https://github.com/samuelkuz")}>
                    <img className="icon-image" src={github_icon_large} alt="github" />
                </div>
                <div className="icon-item" onClick={() => window.open("https://www.linkedin.com/in/samuel-kuznia-698bb8157/")}>
                    <img className="icon-image" src={linkedin} alt="github" />
                </div>
            </div>
        </div>
    );
}

export default ContactMe;
