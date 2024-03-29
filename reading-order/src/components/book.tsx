import React, { useEffect, useState } from 'react';
import { GiVerticalBanner , GiKnightBanner } from "react-icons/gi";
import backgroudMaker from '../util/backgroundMaker';
import fontColorMaker from '../util/fontColorMaker';
import { NoPanArea } from 'react-zoomable-ui';
import '../index.css';
import { useGlobalContext } from '../context';

interface Props {
    x:number;
    y:number;
    id:number;
    title:string;
    author:string;
    book:string;
    faction:string[];
    pages:string;
    audio:string;
    rating:string;
    link:string;
    primary?:boolean;
    page:string;
    factionFilter?:string[];
}
/*  faction:Array<string> */
function Book(props:Props) {
    const { readingProgress , setReadingProgress, saveReadingProgress } = useGlobalContext();
    const { x , y , id , title , author , book , faction , pages , audio , rating , link, primary, page , factionFilter=[] } = props;

    let startInStatus:boolean;
    try {   // Catches the times when the reading progress is undefined. It should have been created before rendering at this point but 
        if ( readingProgress[page][id] === 1 ) {
            startInStatus = true;
        } else {
            startInStatus = false;
        } 
    } catch (error) {
        startInStatus = false;
    }

    const [ isExpanded , setIsExpanded ] = useState<boolean>(false);
    const [ isGreyedOut , setIsGreyedOut ] = useState<boolean>(false);
    const [ isRead , setIsRead ] = useState<boolean>(startInStatus);
    const greyedOutColorHex:string = "#C4C4C4";
    
    var idAsString:string = id.toString()
    
    const isPrimary:boolean = primary || false;

    
    useEffect(() => {
        var sentinelValueFaction:boolean;
        // First checks so the filter isnt empty. Then checks so there are actual factions
        if ( factionFilter.length > 0 && faction[0] !== "") {
            sentinelValueFaction= !(faction.filter(value => factionFilter.includes(value)).length>0);
        } else {
            sentinelValueFaction = false;
        }
        setIsGreyedOut(sentinelValueFaction);
    }, [factionFilter]);


    const handleChange = (e:any) => {
        e.stopPropagation(); // Allows checkbox to work in a clickable div.
        //e.preventDefault();
        //console.log(e.target.checked);
        setIsRead(e.target.checked);
        
        //Update global reading progress array.
        var temp = readingProgress;
        if (e.target.checked) {
            temp[page][id]=1;
            setReadingProgress(temp);
        } else {
            temp[page][id]=0;
            setReadingProgress(temp);
        }
        //Writes to the browsers local storage.
        let stringData = JSON.stringify(readingProgress);
        localStorage.setItem('ReadingProgress', stringData);
        // Call function in context to save the reading progress to the server.
        saveReadingProgress();
    }


    var backgroundMakerColor = backgroudMaker(faction);
    // If the checkbox is checked all text is black, else its generated based on background
    var fontColor = (isGreyedOut||isRead) ? ["#000","#000","#000","#000","#000","#000","#000"] : fontColorMaker(faction, isExpanded);


    return (
        <NoPanArea>
        <div id={idAsString} style={{top:`${y}px`,left:`${x}px`,background:`repeating-linear-gradient(0deg,${ isGreyedOut||isRead ? `${greyedOutColorHex} 0%, ${greyedOutColorHex} 100%` : backgroundMakerColor})`}} className={`select-none hover:select-text w-60 absolute inline-flex flex-col border-2 rounded-2xl doubleClickDisabled ${isExpanded ? "z-20" : "z-10"}`} onClick = { e => { setIsExpanded(!isExpanded); }} >
            <div className='font-semibold text-xl text-clip flex justify-between items-center pt-3 px-3'>
            { !!title && <div className='w-11/12' style={{color:`${fontColor[0]}`}}>{title}</div>}
                <input aria-label='Saves book as read.' type="checkbox" className='w-6 h-6' onClick={e => {handleChange(e);}} defaultChecked={isRead}/>
            </div>
            { !!author && <div className='px-3' style={{color:`${fontColor[1]}`}}>
                Author: {author}
            </div>}
            
            { !!book && <div className={`px-3 ${(isExpanded===false ) ? "pb-3" : ""} ${(isExpanded===true && !pages && !audio && !(rating.length>1) && !link) ? "pb-3" : ""}`} style={{color:`${fontColor[2]}`}}>
                {book}
            </div>}

            { isExpanded ? 
            <>
                { !!pages && <div className='px-3' style={{color:`${fontColor[3]}`}}>
                    Pages: {pages}
                </div>}
                { !!audio && <div className='px-3' style={{color:`${fontColor[4]}`}}>
                    Audiobook length: {audio}
                </div>}
                { rating.length>1 && <div className='px-3' style={{color:`${fontColor[5]}`}}>
                    Rating: {rating}
                </div>}
                { !!link && <div className='flex justify-center content-center p-2' style={{color:`${fontColor[6]}`}}>
                    <a href={link} target="_blank" rel="noopener noreferrer" className='border-2 rounded-full px-2 py-1 font-medium font-lg' onClick={(e)=>{e.stopPropagation()}}>Buy now</a>
                </div>}
            </>
            :
            <></>
            }
            {isPrimary && 
            <div className='absolute flex flex-row justify-evenly w-60 z-0' style={{bottom:"-32px"}}>
                <GiKnightBanner size="2rem" color="black"/>
                <GiVerticalBanner size="2rem" color="black"/>
            </div>}
        </div>
        </NoPanArea>
    );
}

export default Book;


/*        <input
          type="checkbox"
          checked={isLarge}
          onChange={e => {
            setIsExpanded(e.target.checked);
          }}
        /> */
