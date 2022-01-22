import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import './App.css'
import Navbar from './components/navbar';
import HorusHerasy from './pages/horusHeresy/horusHeresy';
import SiegeOfTerra from './pages/siegeOfTerra/siegeOfTerra';
import About from './pages/about/about';
import Error from './pages/error/error';


function App() {
	return (

        <BrowserRouter>
      		<Navbar />
      		<Routes>
				<Route path="/" element={<HorusHerasy />} />
				<Route path="/horusheresy" element={<HorusHerasy />} />
				<Route path="/siegeofterra" element={<SiegeOfTerra />} />
				<Route path="/about" element={<About />} />
				<Route path="*" element={<Error />} />
			</Routes>
    	</BrowserRouter>
    

	);
}

export default App;
