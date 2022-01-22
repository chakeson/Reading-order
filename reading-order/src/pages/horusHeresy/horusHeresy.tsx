import React from 'react';
import '../../index.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


function HorusHerasy() {
  return (
    <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0}>
    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
            <div className="tools">
                <button onClick={() => zoomIn()}>+</button>
                <button onClick={() => zoomOut()}>-</button>
                <button onClick={() => resetTransform()}>x</button>
            </div>
            <TransformComponent>
              <main className="w-screen h-screen bg-black">
                
              </main>
            </TransformComponent>
         </React.Fragment>
    )}
    </TransformWrapper>
    
    

  );
}

export default HorusHerasy;



/*
import React from 'react';
import './index.css';

function HorusHerasy() {
	
	return (
    	<div className="">

    </div>
  );
}

export default HorusHerasy;
*/