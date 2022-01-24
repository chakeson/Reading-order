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
    const [ isExpanded , setIsExpanded ] = useState<boolean>(false);

    return (
        <div className="">
            book
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
