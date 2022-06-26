import React from "react";
import { useHistory } from "react-router-dom";

import headshot from "../assets/headshot.png";

import "./Home.scss";

function Home() {
    const introTitle = "Hello, I'm Sam - A Software Engineer";
    const introText = "I'm currently a Software Development Engineer At Amazon! This website servers two main purposes: to host the two projects listed below, and to host my contact information!";

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
            <div className="projects-title">
                Hosted Projects
            </div>
            <div className="projects-container">
                <div className="projects-link" onClick={() => handleRedirect("algorithm-visualizer")}>
                    <div className="projects-link-text">
                        Sorting Algorithm Visualizer
                    </div>
                </div>
                <div className="projects-link" onClick={() => handleRedirect("graph-visualizer")}>
                    <div className="projects-link-text">
                        Graph Algorithm Visualizer
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
