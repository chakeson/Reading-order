import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import './App.css'
import Navbar from './components/navbar';
import Home from './pages/Home/home';
import HorusHerasy from './pages/horusHeresy/horusHeresy';
import Inquisitors from './pages/inquisitors/inquisitors';
import ImperialGuard from './pages/imperialGaurd/imperialGuard';
import About from './pages/about/about';
import Error from './pages/error/error';
import SuccesfulDelete from './pages/succesfulDelete/succesfulDelete';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Account from './pages/account/account';
import DataDeletionInstructions from './pages/compliancePages/dataDeletionInstructions';
import PrivacyPolicy from './pages/compliancePages/privacyPolicy';
import { useGlobalContext } from './context';


function App() {
	const { isSignedIn } = useGlobalContext();

	return (

        <BrowserRouter>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      		<Navbar />
      		<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/horusheresy" element={<HorusHerasy />} />
				<Route path="/siegeofterra" element={<HorusHerasy />} />
				<Route path="/inquisitors" element={<Inquisitors />} />
				<Route path="/imperialguard" element={<ImperialGuard />} />
				<Route path="/about" element={<About />} />
				{isSignedIn ? <Route path="/login" element={<Account />} /> : <Route path="/login" element={<Login />} />}
				{isSignedIn ? <Route path="/register" element={<Account />} /> :<Route path="/register" element={<Register />} />}
				{isSignedIn ? <Route path="/account" element={<Account />} /> : <Route path="/account" element={<Login />} />}
				{!isSignedIn&& <Route path='/deletion'>
					<Route path=':id' element={<SuccesfulDelete/>} />
				</Route>}
				<Route path="/datadeletioninstructions" element={<DataDeletionInstructions />} />
				<Route path="/privacypolicy" element={<PrivacyPolicy />} />
				<Route path="*" element={<Error />} />
			</Routes>
			</div>
    	</BrowserRouter>
    

	);
}

export default App;