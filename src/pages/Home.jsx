import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import headshot from "../assets/headshot.png";

import "./Home.scss";

function Home() {
    const [showCopy, setShowCopy] = useState(false);

    const emailRef = useRef();
    const history = useHistory();

    const introTitle = "Hello, I'm Sam - A Software Engineer from Minnesota.";
    const introText = "I'm a newly graduated Computer Science student who is excited to begin my Software Engineering journey. I’ve developed features for millions of students on the PebbleGo team, worked on creating multiple in-house software applications, and have never been more motivated/excited to learn!";

    const calculateStyle = () => {
        const style = {
            left: emailRef.current.getBoundingClientRect().x + 5,
            top: emailRef.current.getBoundingClientRect().y - 30,
        };

        return style;
    }

    const handleCopy = () => {
        navigator.clipboard.writeText("samuelkuz@gmail.com");
        console.log(emailRef.current.getBoundingClientRect());
        setShowCopy(true);
        setTimeout(() => {
            setShowCopy(false);
        }, 600);
    };

    const handleRedirect = (redirect) => {
        history.push(`/${redirect}`);
    };
    
    const projectsTitle = "Projects & Featured Work.";

    return (
        <div className="home-wrapper">
            <div className="intro-container">
                <div className="intro-wrapper">
                    <div className="intro-title">{introTitle}</div>
                    <div className="intro-text">{introText}</div>
                </div>
                <div className="head-wrapper">
                    <img className="head-shot" src={headshot} alt="Headshot" />
                </div>
            </div>
            {showCopy &&
                <div className="copy-popup" style={calculateStyle()}>Copied to clipboard!</div>}
            <div className="copy-email" ref={emailRef} onClick={() => handleCopy()}>samuelkuz@gmail.com</div>
            <div className="projects-wrapper">
                <div className="projects-title">{projectsTitle}</div>
                <div className="projects-link" onClick={() => handleRedirect("algorithm-visualizer")}>
                    CLICK HERE FOR PROJECTS!
                </div>
            </div>
        </div>
    );
}

export default Home;
