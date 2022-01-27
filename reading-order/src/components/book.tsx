import React, { useState } from 'react';
import factionToColor from '../util/factionToColor';
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

    const handleChange = (e:any) => {
        e.stopPropagation(); // Allows checkbox to work in a clickable div.
        //e.preventDefault();
        
    }

    const backgroudMaker = (faction:string[]) => {
        var outputString:string = "";
        const factionNumber:number = faction.length;
        const colorList:string[] = factionToColor(faction);
        
        for (let i=0; i<faction.length;i++) {
            outputString = outputString+colorList[i]+" "+ (i/factionNumber)*100+"%" + ",";
            outputString = outputString+colorList[i]+" "+ ((i+1)/factionNumber)*100+"%" + ",";
        }   
        outputString = outputString.slice(0, -1); //Remove last comma.
        return outputString
    }
    const backgroundMakerColor = backgroudMaker(faction);

    return (
        <div style={{top:`${y}px`,left:`${x}px`,background:`repeating-linear-gradient(0deg,${backgroundMakerColor})`}} className=" w-60 absolute inline-flex flex-col border-2 rounded-2xl doubleClickDisabled" onClick = { e => { setIsExpanded(!isExpanded); }} >
            <div className='font-semibold text-xl overflow-clip flex justify-between items-center pt-3 px-3'>
                <div className='w-11/12'>{title}</div>
                <input type="checkbox" className='w-6 h-6' onClick={e => {handleChange(e);}}/>
            </div>
            <div className='px-3'>
                Author: {author}
            </div>
         

            { isExpanded ? 
            <div>
                <div className='px-3'>
                    Book {book}
                </div>   
                <div className='px-3'>
                    Pages: {pages}
                </div>
                <div className='px-3'>
                    Audiobook length: {audio}
                </div>
                <div className='px-3'>
                    Rating: {rating}
                </div>
                <div className='flex justify-center content-center p-2'>
                    <a href={link} target="_blank" rel="noopener noreferrer" className='border-2 rounded-full px-2 py-1 font-medium font-lg'>Buy now</a>
                </div>
            </div>
            :
            <div className='px-3 pb-3'>
            Book {book}
            </div>   
            }
        </div>
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
