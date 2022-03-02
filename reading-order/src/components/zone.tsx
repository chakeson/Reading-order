import React from 'react';
interface Props {
    x:number;
    y:number;
    width:number;
    height:number;
    xtitle:number;
    ytitle:number;
    textwidth?:number;
    id:number;
    title:string;
    icon?:SVGAElement;
}

function Zone(props:Props) {
    const { x , y , width, height , xtitle , ytitle , textwidth , id , title , icon } = props;

    var idAsString:string = id.toString()+"zone"

    return ( 
        <div id={idAsString} style={{top:`${y}px`,left:`${x}px`,width:`${width}px`,height:`${height}px`}} className="border-2 absolute rounded-2xl">
                <h3 style={{top:`${ytitle}px`,left:`${xtitle}px`,width:`${textwidth}px`}} className="absolute font-semibold text-5xl inline-flex flex-col justify-center items-center">
                    {title}
                    {icon}
               </h3>
        </div>
    );
}

export default Zone;