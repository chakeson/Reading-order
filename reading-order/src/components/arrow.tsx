import React, { useEffect, useRef, useState } from 'react';
import Xarrow from "react-xarrows";
import '../index.css';


interface PropsArrow {
    id:number | string;
    type:string;
    gridbreak?:string | undefined ;
    start:number|string;
    end:number|string;
    scale: number | undefined;
}

interface ArrowColorInterface {
    [key:string]:string;
}
interface ArrowDashnessInterface {
    /*Type from dashess in XArrow */
    [key:string]:boolean | { strokeLen?: number | undefined; nonStrokeLen?: number | undefined; animation?: number | boolean | undefined; } | undefined ;
}

function Arrow(props:PropsArrow) {
    const [dimensions, setDimensions] = useState<any>({height:0,width:0});
    const [loadedDimension, setLoadedDimension] = useState<boolean>(false);
    const arrowRef:any = useRef()
    
    
    
    const { type , start, end , scale } = props;
    
    var { gridbreak } =  props;
    gridbreak = gridbreak || ""; // If gridbreak is unassigned, it's assigned as an empty string. Empty gridbreaks values are rendered as default which is 50%.
    
    const startString:string = start.toString();
    const endString:string = end.toString();

    const arrowColor:ArrowColorInterface = {primary:"red",secondary:"blue",tertiary:"green"}
    const arrowDashness:ArrowDashnessInterface = {primary:false, secondary:{strokeLen: 5,nonStrokeLen:2}, tertiary:{strokeLen: 3,nonStrokeLen:5}}
    
    //var zoomScale = scale || 1;
    
    
    useEffect(()=>{
        setTimeout(() => {  console.log("waited"); }, 3000);
        
        console.log(arrowRef.current.children[0].children[0].height.baseVal.value);
        console.log(arrowRef);
        const test = ()=>{
            return
        }
        
        while(arrowRef.current.children[0].children[0].height.baseVal.value !== 0) {
            console.log("while loop");
            
            setTimeout(test,3000);
        }

        setDimensions({height:arrowRef.current.children[0].children[0].height.baseVal.value ,width:arrowRef.current.children[0].children[0].width.baseVal.value});
        setLoadedDimension(true);
    },[])
    
    
	return (
        <div ref={arrowRef}>
            {!loadedDimension ?
            <Xarrow  SVGcanvasStyle={{transform: `scale(${1})`}} start={startString} end={endString} color={arrowColor[type]} path={"grid"} dashness={arrowDashness[type]} startAnchor="right" endAnchor="left" gridBreak={gridbreak}/>
            :
            <Xarrow  SVGcanvasStyle={{transform:`scale(${1})`,height:`${dimensions.height}px`,width:`${dimensions.width}px`}} start={startString} end={endString} color={arrowColor[type]} path={"grid"} dashness={arrowDashness[type]} startAnchor="right" endAnchor="left" gridBreak={gridbreak}/>
            }
        </div>
    );
}
//divContainerProps={{}}
export default Arrow;
