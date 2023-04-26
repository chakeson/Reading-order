import React, { useRef, useState } from 'react';
import '../index.css';
import { Link, useNavigate } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { ImBook } from "react-icons/im";
import { useGlobalContext } from '../context';

function Navbar() {
    const [showMobileNav, setShowMobileNav] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const { isSignedIn , handleLogout } = useGlobalContext();
    
    const navigate = useNavigate();

    const Logout = async () => {
        setShowMobileNav(false);
        await handleLogout();
        navigate('/'); // Called here since it's inside the react router.
    }
    
    return (
        <nav className="bg-blue2 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-12">
            <div className="flex justify-between">
                <div className="p-4 flex items-center">
                    <Link to="/" onClick={()=>{setShowMobileNav(false)}}>
                        <ImBook size="1.5em" color="white"/>
                    </Link>
                </div>

                {/*PC navbar*/}
                <div className="hidden md:flex py-1">
                    <ul className="flex items-center space-x-5 font-bold text-lg lg:text-xl text-white">
                        <li className="transition duration-700 hover:text-grey-300">
                            <Link to="/horusheresy">Horus Heresy</Link>
                        </li>
                        <li className="transition duration-700 hover:text-grey-300">
                            <Link to="/siegeofterra">Siege Of Terra</Link>
                        </li>
                        <li className="transition duration-700 hover:text-">
                            <Link to="/inquisitors">Inquisitors</Link>
                        </li>
                        <li className="transition duration-700 hover:text-grey-300">
                            <Link to="/imperialguard">Imperial Guard</Link>
                        </li>
                        <li className="transition duration-700 hover:text-grey-300">
                            <Link to="/about">About</Link>
                        </li>
                        { isSignedIn ?
                            <>
                            <li className="transition duration-700 hover:text-grey-300">
                                <Link to="/account">Account</Link>
                            </li>
                            <li className="transition duration-700 hover:text-grey-300">
                                <button onClick={()=>Logout()} className="font-bold">Logout</button>
                            </li>
                            </>
                            :
                            <>
                            <li className="transition duration-700 hover:text-grey-300">
                                <Link to="/login">Login</Link>
                            </li>
                            <li className="transition duration-700 hover:text-grey-300">
                                <Link to="/register">Register</Link>
                            </li>
                            </>
                        }
                    </ul>
                </div>
                {/*Mobile navbar*/}
                <div className="md:hidden flex items-center justify-center w-20" onClick={()=>setShowMobileNav(!showMobileNav)}>
                    { showMobileNav ? <IoClose size="2.6em" color="white"/>: <FaBars size="2em" color="white"/>}
                </div>
            </div>
        </div>
        {/*actaul dropdown menu*/}
        <div style={{height:`${showMobileNav ? ((dropdownRef.current?.clientHeight)?.toString()+"px") :"0px"}`}} className={`${showMobileNav ? "w-full transition-all ease-out duration-500 overflow-hidden md:hidden":"w-full transition-all ease-out duration-500 overflow-hidden md:hidden"}`}>
            <ul ref={dropdownRef} className="block font-bold text-xl text-white px-16 pb-3">
                <li>
                    <Link to="/horusheresy" onClick={()=>{setShowMobileNav(false)}}>Horus Heresy</Link>
                </li>
                <li>
                    <Link to="/siegeofterra" onClick={()=>{setShowMobileNav(false)}}>Siege Of Terra</Link>
                </li>
                <li>
                    <Link to="/Inquisitors" onClick={()=>{setShowMobileNav(false)}}>Inquisitors</Link>
                </li>
                <li>
                    <Link to="/imperialguard" onClick={()=>{setShowMobileNav(false)}}>Imperial Guard</Link>
                </li>
                <li>
                    <Link to="/about" onClick={()=>{setShowMobileNav(false)}}>About</Link>
                </li>
                { isSignedIn ?
                    <>
                    <li>
                        <Link to="/account" onClick={()=>{setShowMobileNav(false)}}>Account</Link>
                    </li>
                    <li>
                        <button onClick={()=>{Logout();}} className="font-bold">Logout</button>
                    </li>
                    </>
                    :
                    <>
                    <li>
                        <Link to="/login" onClick={()=>{setShowMobileNav(false)}}>Login</Link>
                    </li>
                    <li>
                        <Link to="/register" onClick={()=>{setShowMobileNav(false)}}>Register</Link>
                    </li>
                    </>
                }
            </ul>
        </div>
    </nav>
    );
}

export default Navbar;