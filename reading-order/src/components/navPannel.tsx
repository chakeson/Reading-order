import React, {useState} from 'react';
import NavPannelFaction from './navPannelFaction';
import '../index.css';


function NavPannel() {
    const [ isNavExpanded , setIsNavExpanded ] = useState<boolean>(true);
  

    const handleClickBar = (e:any) => {
        e.stopPropagation(); 
        if (isNavExpanded) {
            return
        }
        setIsNavExpanded(true);
    }
    const handleClickButton = (e:any) => {
        e.stopPropagation(); 
        setIsNavExpanded(!isNavExpanded)
    }
    
    return (
    <nav onClick={(e)=>handleClickBar(e)} className={`w-96 absolute top-0 left-0 z-20 border-2 rounded-br-2xl inline-flex flex-col nav-pannel bg-map ${isNavExpanded?"":"cursor-pointer"}`}>
        <div className={`px-6 pt-2 ${isNavExpanded ? "pb-6 " : "pb-2" }`}>
            <div className='flex flex-row justify-between'>
                <h1 className='text-2xl font-bold'>Title</h1>
                <button onClick={(e)=>handleClickButton(e)}>{ isNavExpanded ? "X" : "\\/"}</button>
            </div>
            {isNavExpanded ? 
            <>
            <p>Quod architecto vitae obcaecati accusamus ullam rem nesciunt nihil vel expedita.</p>
            <h1 className='text-2xl font-bold'>Factions</h1>
            <NavPannelFaction />
            <h1 className='text-2xl font-bold'>Legends</h1>
            <div>
                <div className='flex flex-row'>
                    <div>Arrow</div>
                    <h4 className='font-semibold'>Primary</h4>
                    <p>High risk of spoiling the plot</p>
                </div>
                <div className='flex flex-row'>
                    <div>Arrow</div>
                    <h4 className='font-semibold'>Secondary</h4>
                    <p>May spoil significant parts of the story</p>
                </div>
                <div className='flex flex-row'>
                    <div>Arrow</div>
                    <h4 className='font-semibold'>Tertiary</h4>
                    <p>Common character</p>
                </div>
            </div>
            </>
            :""}
        </div>
    </nav>
  );
}

export default NavPannel;
