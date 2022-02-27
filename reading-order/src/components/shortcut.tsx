import React from 'react';
import backgroudMakerTilted from '../util/backgroundMakerTilted';
import fontColorMaker from '../util/fontColorMaker';


interface Props {
    x:number;
    y:number;
    id:number;
    title:string;
    faction:string[];
}

function Shortcut(props:Props) {
    const { x , y , id , title , faction } = props;
    var idAsString:string = id.toString()+"shortcut"

    
    var backgroundMakerColor = backgroudMakerTilted(faction);
    
    var fontColor = fontColorMaker(faction, false);
 
    //console.log(backgroundMakerColor);
     

    return ( 
        <div id={idAsString} className='z-10 border-2 absolute rounded-2xl p-3 font-semibold text-xl overflow-clip inline-flex flex-col justify-center items-center' style={{top:`${y}px`,left:`${x}px`,background:`repeating-linear-gradient(180deg,${backgroundMakerColor})`}} >
               <h3 style={{color:`${fontColor[0]}`}}>
                    {title}
               </h3>
        </div> 
    );
}

export default Shortcut;