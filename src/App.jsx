import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AlgorithmVisualizer from "./pages/AlgorithmVisualizer.jsx";
import ContactMe from "./pages/ContactMe.jsx";
import DroneDeliverySystem from "./pages/DroneDeliverySystem.jsx";
import HeaderBar from "./components/HeaderBar.jsx";
import Home from "./pages/Home.jsx";
import GraphVisualizer from "./pages/GraphVisualizer.jsx";

import './App.scss';

function App() {
	return (
		<Router>
			<div className="App">
				<div className="white-space"></div>
			</div>
			<HeaderBar />
			<Routes>
				<Route path="/drone-delivery-system" element={<DroneDeliverySystem />} />
				<Route path="/algorithm-visualizer" element={<AlgorithmVisualizer />} />
				<Route path="/graph-visualizer" element={<GraphVisualizer />} />
				<Route path="/contact-me" element={<ContactMe />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</Router>
	);
}

export default App;
