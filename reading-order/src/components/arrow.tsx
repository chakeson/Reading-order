import React from 'react';
import Xarrow from "react-xarrows";
import '../index.css';


interface PropsArrow {
    id:number | string;
    type:string;
    gridbreak?:string | undefined ;
    start:number;
    end:number;
}

interface ArrowColorInterface {
    [key:string]:string;
}
interface ArrowDashnessInterface {
    /*Type from dashess in XArrow */
    [key:string]:boolean | { strokeLen?: number | undefined; nonStrokeLen?: number | undefined; animation?: number | boolean | undefined; } | undefined ;
}

function Arrow(props:PropsArrow) {
    const { type , start, end } = props;
    
    var { gridbreak } =  props;
    gridbreak = gridbreak || ""; // If gridbreak is unassigned, it's assigned as an empty string. Empty gridbreaks values are rendered as default which is 50%.
    
    const startString:string = start.toString();
    const endString:string = end.toString();

    const arrowColor:ArrowColorInterface = {primary:"red",secondary:"blue",tertiary:"green"}
    const arrowDashness:ArrowDashnessInterface = {primary:false, secondary:{strokeLen: 5,nonStrokeLen:2}, tertiary:{strokeLen: 3,nonStrokeLen:5}}

	return (
            <Xarrow start={startString} end={endString} color={arrowColor[type]} path={"grid"} dashness={arrowDashness[type]} startAnchor="right" endAnchor="left" gridBreak={gridbreak}/>
    );
}

export default Arrow;
