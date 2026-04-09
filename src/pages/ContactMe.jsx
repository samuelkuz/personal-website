import React, { useState } from "react";

import CopyToast from "../components/CopyToast.jsx";

import "./ContactMe.scss";

const contactLinks = [
    {
        label: "GitHub",
        href: "https://github.com/samuelkuz",
        description: "Browse projects, experiments, and source code.",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/samuel-kuznia-698bb8157/",
        description: "Connect professionally and follow my career updates.",
    },
    {
        label: "Email",
        href: "copy",
        description: "The fastest path if you want to talk about a role or project.",
    },
];

const EMAIL_ADDRESS = "samuelkuz@gmail.com";

function ContactMe() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(EMAIL_ADDRESS);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
    };

    return (
        <div className="page-shell contact-page">
            <section className="contact-hero surface-card">
                <div className="contact-copy">
                    <div className="section-kicker">Contact</div>
                    <h1 className="section-title">Contact</h1>
                    <p className="section-copy">
                        The best way to reach me is by email. You can also find me on GitHub and LinkedIn.
                    </p>
                    <div className="contact-actions">
                        <button className="button-link contact-action-button" onClick={handleCopy} type="button">
                            Email Sam
                        </button>
                        <button className="button-link secondary contact-copy-button" onClick={handleCopy} type="button">
                            Copy Email
                        </button>
                    </div>
                </div>
                <div className="contact-sidebar">
                    <div className="contact-detail-card">
                        <div className="detail-label">Email</div>
                        <button className="detail-value detail-copy-button" onClick={handleCopy} type="button">
                            {EMAIL_ADDRESS}
                        </button>
                        <p>Feel free to reach out.</p>
                    </div>
                </div>
            </section>

            <section className="contact-link-grid">
                {contactLinks.map((entry) => (
                    entry.href === "copy" ? (
                        <button key={entry.label} className="contact-link-card surface-card contact-link-button" onClick={handleCopy} type="button">
                            <div className="contact-link-top">{entry.label}</div>
                            <p>{entry.description}</p>
                        </button>
                    ) : (
                        <a
                            key={entry.label}
                            className="contact-link-card surface-card"
                            href={entry.href}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <div className="contact-link-top">{entry.label}</div>
                            <p>{entry.description}</p>
                        </a>
                    )
                ))}
            </section>
            <CopyToast show={copied} />
        </div>
    );
}

export default ContactMe;
