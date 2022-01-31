import React from 'react';
import '../index.css';


interface PropsArrow {
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
/*{
    id:1,
    color:"red",
    type:"primary",
    dimension:[{x:340,y:150,length:100,height:20}]
},*/
//[{x:100,y:100,length:100,height:20}]
function Arrow(props:PropsArrow) {
    const { color , type , dimension } = props;

	return (
        <>
            {dimension.map((data,index)=>{
                return <div></div>;
                
            })}
        </>
    );
}

export default Arrow;
