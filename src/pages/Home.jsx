import React from "react";
import { useHistory } from "react-router-dom";

import headshot from "../assets/headshot.JPG";

import "./Home.scss";

function Home() {
    const introTitle = "Hello, I'm Sam - A Software Engineer from Minnesota.";
    const introText = "I am a newly graduated Computer Science student excited to begin my Software Engineering journey. I’ve developed features for millions of students on the PebbleGo team, worked on creating multiple in-house software applications, and have never been more motivated/excited to learn!";

    const history = useHistory();

    const handleRedirect = (redirect) => {
        history.push(`/${redirect}`);
    };

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
            <div className="projects-link" onClick={() => handleRedirect("algorithm-visualizer")}>
                CLICK HERE FOR PROJECTS!
            </div>
        </div>
    );
}

export default Home;
