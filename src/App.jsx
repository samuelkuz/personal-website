import React from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

import AlgorithmVisualizer from "./pages/AlgorithmVisualizer.jsx";
import DroneDeliverySystem from "./pages/DroneDeliverySystem.jsx";
import Home from "./pages/Home.jsx";
import NavigationBar from "./components/NavigationBar.jsx";

import './App.scss';

function App() {
	return (
		<Router>
			<div className="App">
				<NavigationBar></NavigationBar>
			</div>
			<Switch>
				<Route path="/drone-delivery-system" component={DroneDeliverySystem}/>
				<Route path="/algorithm-visualizer" component={AlgorithmVisualizer}/>
				<Route path="/" component={Home}/>
			</Switch>
		</Router>
	);
}

export default App;
