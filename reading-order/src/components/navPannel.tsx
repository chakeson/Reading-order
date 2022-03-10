import React, {useState} from 'react';
import Xarrow from "react-xarrows";
import NavPannelFaction from './navPannelFaction';
import '../index.css';


function NavPannel() {
    const [ isNavExpanded , setIsNavExpanded ] = useState<boolean>(false);
  

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
        <div className={`px-6 pt-2 ${isNavExpanded ? "pb-4" : "pb-2" }`}>
            <div className='flex flex-row justify-between'>
                <h1 className='text-2xl font-bold'>Legend</h1>
                <button onClick={(e)=>handleClickButton(e)}>{ isNavExpanded ? "X" : "\\/"}</button>
            </div>
            {isNavExpanded ? 
            <>
            <p>Explains the map element.</p>
            <h1 className='text-2xl font-bold'>Factions</h1>
            <NavPannelFaction />
            <h1 className='text-2xl font-bold'>Arrows</h1>
            <div>
                <div className='flex flex-row'>
                    <div className='flex flex-row'>
                        <div id="example-arrow-1-start" className='w-10'></div>
                        <div id="example-arrow-1-end" className='w-10'></div>
                    </div>
                    <Xarrow start="example-arrow-1-start" end="example-arrow-1-end" color="red" path={"grid"} startAnchor={{position: "left", offset: {y: -11}}} endAnchor={{position: "right", offset: {y: -11}}}/>
                    <h4 className='font-semibold mx-2 w-24'>Primary</h4>
                    <p>High risk of spoiling the plot</p>
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-row'>
                        <div id="example-arrow-2-start" className='w-10'></div>
                        <div id="example-arrow-2-end" className='w-10'></div>
                    </div>
                    <Xarrow start="example-arrow-2-start" end="example-arrow-2-end" color="blue" path={"grid"} dashness={{strokeLen: 5,nonStrokeLen:2}} startAnchor={{position: "left", offset: {y: -11}}} endAnchor={{position: "right", offset: {y: -11}}}/>
                    <h4 className='font-semibold mx-2 w-24'>Secondary</h4>
                    <p>May spoil significant parts of the story</p>
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-row'>
                        <div id="example-arrow-3-start" className='w-10'></div>
                        <div id="example-arrow-3-end" className='w-10'></div>
                    </div>
                    <Xarrow start="example-arrow-3-start" end="example-arrow-3-end" color="green" path={"grid"} dashness={{strokeLen: 3,nonStrokeLen:5}} startAnchor={{position: "left", offset: {y: -11}}} endAnchor={{position: "right", offset: {y: -11}}}/>
                    <h4 className='font-semibold mx-2 w-24'>Tertiary</h4>
                    <p>May contain common character</p>
                </div>
            </div>
            </>
            :""}
        </div>
    </nav>
  );
}

export default NavPannel;
