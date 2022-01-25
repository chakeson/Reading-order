import React, { useState } from 'react';
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


    return (
        <div className="inline-flex flex-col border-2" onClick = { e => { setIsExpanded(!isExpanded); }} >
            <div>
                {title}
            </div>
            <div>
                Author: {author}
            </div>
            <div>
                Book {book}
            </div>
            <input type="checkbox"   onClick={e => {handleChange(e);}}/>

            { isExpanded ? 
            <div>
                <div>
                    Pages:{pages}
                </div>
                <div>
                    Audiobook length: {audio}
                </div>
                <div>
                    Rating: {rating}
                </div>
                <div>
                    <a href={link}  target="_blank" rel="noopener noreferrer">Buy now</a>
                </div>
            </div>
            :""}
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
