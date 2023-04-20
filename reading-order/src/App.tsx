import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import './App.css'
import Navbar from './components/navbar';
import Home from './pages/Home/home';
import About from './pages/about/about';
import Error from './pages/error/error';
import Loading from './pages/loading/loading';
import Login from './pages/login/login';
import Register from './pages/register/register';
import { useGlobalContext } from './context';

const HorusHerasy = lazy(() => import('./pages/horusHeresy/horusHeresy'));
const Inquisitors = lazy(() => import('./pages/inquisitors/inquisitors'));
const ImperialGuard = lazy(() => import('./pages/imperialGaurd/imperialGuard'));
const Account = lazy(() => import('./pages/account/account'));
const DataDeletionInstructions = lazy(() => import('./pages/compliancePages/dataDeletionInstructions'));
const PrivacyPolicy = lazy(() => import('./pages/compliancePages/privacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/compliancePages/termsAndConditions'));
const SuccesfulDelete = lazy(() => import('./pages/succesfulDelete/succesfulDelete'));


function App() {
	const { isSignedIn } = useGlobalContext();

	return (

        <BrowserRouter>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      		<Navbar />
			<Suspense fallback={<Loading />}>
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
				<Route path="/termsandconditions" element={<TermsAndConditions />} />
				<Route path="*" element={<Error />} />
				{/*<Route path="/loading" element={<Loading />} />*/}
			</Routes>
			</Suspense>
			</div>
    	</BrowserRouter>
    

	);
}

export default App;