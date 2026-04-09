import React, { useState } from "react";
import { Link } from "react-router-dom";

import headshot from "../assets/headshot.png";
import CopyToast from "../components/CopyToast.jsx";

import "./Home.scss";

const EMAIL_ADDRESS = "samuelkuz@gmail.com";

function Home() {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = async () => {
        await navigator.clipboard.writeText(EMAIL_ADDRESS);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
    };

    return (
        <div className="page-shell home-page">
            <section className="hero-section">
                <div className="hero-copy">
                    <div className="section-kicker">Sam · Software Engineer</div>
                    <h1 className="section-title">I build full-stack software.</h1>
                    <p className="section-copy hero-summary">
                        I&apos;m Sam, a software engineer with 5+ years of experience in full-stack development.
                        I care about building clean, reliable products and thoughtful user experiences.
                    </p>
                    <div className="home-meta">
                        <div>
                            <span className="home-meta-label">What I do</span>
                            <p>Frontend, backend, and product-focused engineering.</p>
                        </div>
                        <div>
                            <span className="home-meta-label">Contact</span>
                            <div className="copy-email-block">
                                <button className="copy-email-button" onClick={handleCopyEmail} type="button">
                                    {EMAIL_ADDRESS}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="hero-actions">
                        <Link className="button-link" to="/projects">
                            Projects
                        </Link>
                        <Link className="button-link secondary" to="/contact">
                            Contact
                        </Link>
                    </div>
                </div>

                <div className="hero-profile">
                    <div className="hero-photo-wrap">
                        <img className="hero-photo" src={headshot} alt="Portrait of Sam" />
                    </div>
                    <div className="hero-link-grid">
                        <a href="https://github.com/samuelkuz" rel="noreferrer" target="_blank">
                            GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/samuel-kuznia-698bb8157/" rel="noreferrer" target="_blank">
                            LinkedIn
                        </a>
                        <button className="hero-link-button" onClick={handleCopyEmail} type="button">
                            Email
                        </button>
                    </div>
                </div>
            </section>
            <CopyToast show={copied} />
        </div>
    );
}

export default Home;
