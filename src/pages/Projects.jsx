import React from "react";
import { Link } from "react-router-dom";

import { featuredProjects } from "../content/projects";

import "./Projects.scss";

function Projects() {
    return (
        <div className="page-shell projects-page">
            <section className="projects-hero">
                <div>
                    <div className="section-kicker">Projects</div>
                    <h1 className="section-title">Projects</h1>
                    <p className="section-copy">
                        A small collection of interactive work. For now, this page links to the two algorithm visualizers I coded years ago.
                    </p>
                </div>
            </section>

            <section className="project-list">
                {featuredProjects.map((project) => (
                    <article key={project.id} className="project-entry surface-card">
                        <div className="project-entry-main">
                            <h2>{project.title}</h2>
                            <p>{project.summary}</p>
                        </div>
                        <div className="project-entry-side">
                            <Link className="button-link" to={project.route}>
                                Open
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
}

export default Projects;
