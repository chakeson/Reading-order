import React, { useState } from 'react';
import '../index.css';
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { ImBook } from "react-icons/im";


function Navbar() {
    const [showMobileNav, setShowMobileNav] = useState<boolean>(false);
    
  
    return (
        <nav className="bg-blue2 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-12">
            <div className="flex justify-between">
                <div className="py-4 flex items-center">
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
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </div>
                {/*Mobile navbar*/}
                <div className="md:hidden flex items-center transform transition duration-700 hover:scale-10" onClick={()=>setShowMobileNav(!showMobileNav)}>
                    <FaBars  size="2em" color="white"/>
                </div>
            </div>
        </div>
        {/*actaul dropdown menu*/}
        <div className={`${showMobileNav ? "w-full h-32 transition-all ease-out duration-500 overflow-hidden md:hidden":"w-full h-0 transition-all ease-out duration-500 overflow-hidden md:hidden"}`}>
            <ul className="block font-bold text-xl text-white px-4 py-2">
                <li className="transform transition duration-700 hover:text-tertiary">
                    <Link to="/horusheresy">Horus Heresy</Link>
                </li>
                <li className="transform transition duration-700 hover:text-tertiary">
                    <Link to="/siegeofterra">Siege Of Terra</Link>
                </li>
                <li className="transform transition duration-700 hover:text-tertiary">
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </div>
    </nav>
        );
}

export default Navbar;