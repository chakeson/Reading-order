import React, {useState} from 'react';
import Xarrow from "react-xarrows";
import NavPannelFaction from './navPannelFaction';
import { GiVerticalBanner , GiKnightBanner } from "react-icons/gi";
import { IoIosArrowUp , IoIosArrowDown} from "react-icons/io";

/*
    Compent for map book pages that renders the nappannel which works as the legend.
    Its normal input which is conditional is for faction and symbol rendering which normally is shown.
    What factions it diplays is determined in the navPannelFaction component.
*/


function NavPannel({factions=true, symbols=true}:{factions?:boolean, symbols?:boolean}) {

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
    <nav onClick={(e)=>handleClickBar(e)} className={`w-full sm:w-72 md:w-80 lg:w-96 3xl:w-3/12 absolute top-0 left-0 z-20 border-2 rounded-br-2xl inline-flex flex-col nav-pannel bg-map ${isNavExpanded?"":"cursor-pointer"}`}>
        <div className={`px-12 sm:px-6 ${isNavExpanded ? "pb-4" : "pb-1 sm:pb-2" }`}>
            <div className='pt-1 sm:pt-2 bg-map flex flex-row justify-between pb-1'>
                <h1 className='text-lg md:text-xl lg:text-2xl 3xl:text-4xl font-bold'>{isNavExpanded ? (factions?"Factions":"Symbols"):"Legend"}</h1>
                <button onClick={(e)=>handleClickButton(e)}>{ isNavExpanded ? < IoIosArrowUp size="1.5rem" color="black"/> : < IoIosArrowDown size="1.5rem" color="black"/> }</button>
            </div>

            {/* Handles in and out animation */}
            <div className='overflow-hidden'>
            <div className={`${isNavExpanded?"nav-show":"nav-hidden"}`}>
            
            <>
            {factions && <NavPannelFaction />}
            {symbols &&
            <>
            {factions && <h1 className='text-lg md:text-xl lg:text-2xl 3xl:text-4xl font-bold pb-2 sm:pb-0'>Symbols</h1>}
            <div>
                <div className='flex flex-row'>
                    <div className='flex flex-row 3xl:w-2/6'>
                        <div id="example-arrow-1-start" className='w-6 md:w-10 3xl:w-1/2'></div>
                        <div id="example-arrow-1-end" className='w-6 md:w-10 3xl:w-1/2'></div>
                    </div>
                    <Xarrow start="example-arrow-1-start" end="example-arrow-1-end" color="red" path={"grid"} startAnchor={{position: "left", offset: {}}} endAnchor={{position: "right", offset: {}}} zIndex={-1}/>
                    <h4 className='text-base sm:text-sm md:text-base 3xl:text-3xl font-semibold mx-2 w-24 3xl:w-auto my-auto top-0 bottom-0'>Primary</h4>
                    <p className='text-xs sm:text-sm lg:text-sm 3xl:text-3xl pl-2'>High risk of spoiling the plot</p>
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-row 3xl:w-2/6'>
                        <div id="example-arrow-2-start" className='w-6 md:w-10 3xl:w-1/2'></div>
                        <div id="example-arrow-2-end" className='w-6 md:w-10 3xl:w-1/2'></div>
                    </div>
                    <Xarrow start="example-arrow-2-start" end="example-arrow-2-end" color="blue" path={"grid"} dashness={{strokeLen: 5,nonStrokeLen:2}} startAnchor={{position: "left", offset: {}}} endAnchor={{position: "right", offset: {}}} zIndex={-1}/>
                    <h4 className='text-base sm:text-sm md:text-base 3xl:text-3xl font-semibold mx-2 w-24 3xl:w-auto my-auto top-0 bottom-0'>Secondary</h4>
                    <p className='text-xs sm:text-sm lg:text-sm 3xl:text-3xl pl-2'>May spoil significant parts of the story</p>
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-row 3xl:w-2/6'>
                        <div id="example-arrow-3-start" className='w-6 md:w-10 3xl:w-1/2'></div>
                        <div id="example-arrow-3-end" className='w-6 md:w-10 3xl:w-1/2'></div>
                    </div>
                    <Xarrow start="example-arrow-3-start" end="example-arrow-3-end" color="green" path={"grid"} dashness={{strokeLen: 3,nonStrokeLen:5}} startAnchor={{position: "left", offset: {}}} endAnchor={{position: "right", offset: {}}} zIndex={-1}/>
                    <h4 className='text-base sm:text-sm md:text-base 3xl:text-3xl font-semibold mx-2 w-24 3xl:w-auto my-auto top-0 bottom-0'>Tertiary</h4>
                    <p className='text-xs sm:text-sm lg:text-sm 3xl:text-3xl pl-2'>May contain common character</p>
                </div>
                
                <div className='flex flex-row text-3xl sm:text-5xl 3xl:text-6xl'>
                    <GiKnightBanner color="black"/>
                    <GiVerticalBanner color="black"/>
                    <p className='mx-2 text-xs sm:text-sm lg:text-sm 3xl:text-3xl'>Indiactes that the texts are essential or major part of the story.</p>
                </div>
            </div>
            </>}
            </>

            </div>
            </div>
        </div>
    </nav>
  );
}

export default NavPannel;
