import React, { useRef, useState } from 'react';
import '../index.css';
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { ImBook } from "react-icons/im";
import { useGlobalContext } from '../context';

function Navbar() {
    const [showMobileNav, setShowMobileNav] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const { isSignedIn } = useGlobalContext();
    
    return (
        <nav className="bg-blue2 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-12">
            <div className="flex justify-between">
                <div className="p-4 flex items-center">
                    <Link to="/">
                        <ImBook size="1.5em" color="white"/>
                    </Link>
                </div>

                {/*PC navbar*/}
                <div className="hidden md:flex py-1">
                    <ul className="flex items-center space-x-5 font-bold text-xl text-white">
                        <li className="transform transition duration-700 hover:scale-105 hover:text-tertiary">
                            <Link to="/horusheresy">Horus Heresy</Link>
                        </li>
                        <li className="transform transition duration-700 hover:scale-105 hover:text-tertiary">
                            <Link to="/siegeofterra">Siege Of Terra</Link>
                        </li>
                        <li className="transform transition duration-700 hover:scale-105 hover:text-tertiary">
                            <Link to="/inquisitors">Inquisitors</Link>
                        </li>
                        <li className="transform transition duration-700 hover:scale-105 hover:text-tertiary">
                            <Link to="/imperialgaurd">Imperial Gaurd</Link>
                        </li>
                        <li className="transform transition duration-700 hover:scale-105 hover:text-tertiary">
                            <Link to="/about">About</Link>
                        </li>
                        { isSignedIn ?
                            <li className="transform transition duration-700 hover:scale-105 hover:text-tertiary">
                                <Link to="/account">Account</Link>
                            </li>
                            :
                            <>
                            <li className="transform transition duration-700 hover:scale-105 hover:text-tertiary">
                                <Link to="/login">Login</Link>
                            </li>
                            <li className="transform transition duration-700 hover:scale-105 hover:text-tertiary">
                                <Link to="/register">Register</Link>
                            </li>
                            </>
                        }
                    </ul>
                </div>
                {/*Mobile navbar*/}
                <div className="md:hidden flex items-center transform transition duration-700 hover:scale-10" onClick={()=>setShowMobileNav(!showMobileNav)}>
                    <FaBars  size="2em" color="white"/>
                </div>
            </div>
        </div>
        {/*actaul dropdown menu*/}
        <div style={{height:`${showMobileNav ? ((dropdownRef.current?.clientHeight)?.toString()+"px") :"0px"}`}} className={`${showMobileNav ? "w-full transition-all ease-out duration-500 overflow-hidden md:hidden":"w-full transition-all ease-out duration-500 overflow-hidden md:hidden"}`}>
            <ul ref={dropdownRef} className="block font-bold text-xl text-white px-16 pb-3">
                <li className="transform transition duration-700 hover:text-tertiary">
                    <Link to="/horusheresy">Horus Heresy</Link>
                </li>
                <li className="transform transition duration-700 hover:text-tertiary">
                    <Link to="/siegeofterra">Siege Of Terra</Link>
                </li>
                <li className="transform transition duration-700 hover:text-tertiary">
                    <Link to="/Inquisitors">Inquisitors</Link>
                </li>
                <li className="transform transition duration-700 hover:text-tertiary">
                    <Link to="/imperialgaurd">Imperial Gaurd</Link>
                </li>
                <li className="transform transition duration-700 hover:text-tertiary">
                    <Link to="/about">About</Link>
                </li>
                { isSignedIn ?
                    <li className="transform transition duration-700 hover:scale-105 hover:text-tertiary">
                        <Link to="/account">Account</Link>
                    </li>
                    :
                    <>
                    <li className="transform transition duration-700 hover:text-tertiary">
                        <Link to="/login">Login</Link>
                    </li>
                    <li className="transform transition duration-700 hover:text-tertiary">
                        <Link to="/register">Register</Link>
                    </li>
                    </>
                }
            </ul>
        </div>
    </nav>
    );
}

export default Navbar;