import React from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

import AlgorithmVisualizer from "./pages/AlgorithmVisualizer.jsx";
import BottomBar from "./components/BottomBar.jsx";
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
			<HeaderBar/>
			<Switch>
				<Route path="/drone-delivery-system" component={DroneDeliverySystem}/>
				<Route path="/algorithm-visualizer" component={AlgorithmVisualizer}/>
				<Route path="/graph-visualizer" component={GraphVisualizer}/>
				<Route path="/contact-me" component={ContactMe}/>
				<Route path="/" component={Home}/>
			</Switch>
			{/* <BottomBar/> */}
		</Router>
	);
}

export default App;
