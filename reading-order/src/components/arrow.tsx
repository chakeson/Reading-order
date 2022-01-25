import React from 'react';
import '../index.css';


interface Props {
    id:number;
    color:string;
    type:string;
    dimension:{
        x:number;
        y:number;
        length:number;
        height:number;
    }[];
}
//[{x:100,y:100,length:100,height:20}]
function Arrow(props:Props) {


	return (
        <div className="">
            Arrow
        </div>
    );
}

export default Arrow;
