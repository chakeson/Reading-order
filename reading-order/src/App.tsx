import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './index.css';
import './App.css'
import Navbar from './components/navbar';
import HorusHerasy from './pages/horusHeresy/horusHeresy';
import SiegeOfTerra from './pages/siegeOfTerra/siegeOfTerra';
import About from './pages/about/about';
import Error from './pages/error/error';


function App() {
	return (

        <Router>
      		<Navbar />
      		<Switch>
				<Route exact path="/">
					<HorusHerasy />
				</Route>
				<Route exact path="/horusheresy">
					<HorusHerasy />
				</Route>
				<Route exact path="/siegeofterra">
					<SiegeOfTerra />
				</Route>
				<Route exact path="/about">
					<About />
				</Route>
				<Route path="*">
					<Error />
				</Route>
			</Switch>
    	</Router>
    

	);
}

export default App;
