import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import './App.css'
import Navbar from './components/navbar';
import HorusHerasy from './pages/horusHeresy/horusHeresy';
import SiegeOfTerra from './pages/siegeOfTerra/siegeOfTerra';
import Inquisitors from './pages/inquisitors/inquisitors';
import About from './pages/about/about';
import Error from './pages/error/error';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Account from './pages/account/account';
import { useGlobalContext } from './context';


function App() {
	const { isSignedIn } = useGlobalContext();

	return (

        <BrowserRouter>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      		<Navbar />
      		<Routes>
				<Route path="/" element={<HorusHerasy />} />
				<Route path="/horusheresy" element={<HorusHerasy />} />
				<Route path="/siegeofterra" element={<SiegeOfTerra />} />
				<Route path="/inquisitors" element={<Inquisitors />} />
				<Route path="/about" element={<About />} />
				{isSignedIn ? <Route path="/login" element={<Account />} /> : <Route path="/login" element={<Login />} />}
				{isSignedIn ? <Route path="/register" element={<Account />} /> :<Route path="/register" element={<Register />} />}
				{isSignedIn ? <Route path="/account" element={<Account />} /> : <Route path="/account" element={<Login />} />}
				<Route path="*" element={<Error />} />
			</Routes>
			</div>
    	</BrowserRouter>
    

	);
}

export default App;
