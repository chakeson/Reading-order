import React, { useState } from 'react';
import backgroudMaker from '../util/backgroundMaker';
import fontColorMaker from '../util/fontColorMaker';
import { NoPanArea } from 'react-zoomable-ui';
import '../index.css';

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
}
/*  faction:Array<string> */
function Book(props:Props) {
    const { x , y , id , title , author , book , faction , pages , audio , rating , link } = props;
    const [ isExpanded , setIsExpanded ] = useState<boolean>(false);
    const [ isGreyedOut , setIsGreyedOut ] = useState<boolean>(false);
    const greyedOutColorHex:string = "#C4C4C4";
    
    var idAsString:string = id.toString()
    
    const handleChange = (e:any) => {
        e.stopPropagation(); // Allows checkbox to work in a clickable div.
        //e.preventDefault();
        //console.log(e.target.checked);
        setIsGreyedOut(e.target.checked);
    }


    var backgroundMakerColor = backgroudMaker(faction);
    
    var fontColor = fontColorMaker(faction, isExpanded);


    return (
        <NoPanArea>
        <div id={idAsString} style={{top:`${y}px`,left:`${x}px`,background:`repeating-linear-gradient(0deg,${ isGreyedOut ? `${greyedOutColorHex} 0%, ${greyedOutColorHex} 100%` : backgroundMakerColor})`}} className={`w-60 absolute inline-flex flex-col border-2 rounded-2xl doubleClickDisabled ${isExpanded ? "z-50" : ""}`} onClick = { e => { setIsExpanded(!isExpanded); }} >
            <div className='font-semibold text-xl text-clip flex justify-between items-center pt-3 px-3'>
            { !!title && <div className='w-11/12' style={{color:`${fontColor[0]}`}}>{title}</div>}
                <input type="checkbox" className='w-6 h-6' onClick={e => {handleChange(e);}}/>
            </div>
            { !!author && <div className='px-3' style={{color:`${fontColor[1]}`}}>
                Author: {author}
            </div>}
            

            { isExpanded ? 
            <div>
                { !!book && <div className='px-3' style={{color:`${fontColor[2]}`}}>
                    {book}
                </div>}
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
                    <a href={link} target="_blank" rel="noopener noreferrer" className='border-2 rounded-full px-2 py-1 font-medium font-lg'>Buy now</a>
                </div>}
            </div>
            :
            !!book && <div className='px-3 pb-3' style={{color:`${fontColor[2]}`}}>
                {book}
            </div>
            }
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
