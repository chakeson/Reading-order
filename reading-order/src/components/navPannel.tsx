import React, {useState} from 'react';
import NavPannelFaction from './navPannelFaction';
import '../index.css';


function NavPannel() {
    const [ isNavExpanded , setIsNavExpanded ] = useState<boolean>(true);
  
    return (
    <nav className="w-96 absolute top-0 left-0 z-20 border-2 rounded-br-2xl inline-flex flex-col nav-pannel bg-map">
        <div className={`px-6 pt-2 ${isNavExpanded ? "pb-6 " : "pb-2" }`}>
            <div className='flex flex-row justify-between'>
                <h1 className='text-2xl font-bold'>Title</h1>
                <button onClick={(e)=>{setIsNavExpanded(!isNavExpanded)}}>X</button>
            </div>
            {isNavExpanded ? 
            <>
            <p>Quod architecto vitae obcaecati accusamus ullam rem nesciunt nihil vel expedita.</p>
            <h1 className='text-2xl font-bold'>Factions</h1>
            <NavPannelFaction />
            </>
            :""}
        </div>
    </nav>
  );
}

export default NavPannel;
