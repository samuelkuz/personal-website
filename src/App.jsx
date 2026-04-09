import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HeaderBar from "./components/HeaderBar.jsx";
import AlgorithmVisualizer from "./pages/AlgorithmVisualizer.jsx";
import ContactMe from "./pages/ContactMe.jsx";
import GraphVisualizer from "./pages/GraphVisualizer.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";

import "./App.scss";

function App() {
    return (
        <Router>
            <div className="app-shell">
                <div className="app-ambient app-ambient-one"></div>
                <div className="app-ambient app-ambient-two"></div>
                <HeaderBar />
                <main className="app-main">
                    <Routes>
                        <Route path="/algorithm-visualizer" element={<AlgorithmVisualizer />} />
                        <Route path="/graph-visualizer" element={<GraphVisualizer />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/contact" element={<ContactMe />} />
                        <Route path="/contact-me" element={<ContactMe />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
