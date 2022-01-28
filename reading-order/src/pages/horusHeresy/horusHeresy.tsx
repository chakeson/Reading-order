import React from 'react';
import '../../index.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Book from '../../components/book';
import Arrow from '../../components/arrow';
import horusHeresyDataBooks, { horusHeresyDataArrow } from './horusHeresyData'; 
import NavPannel from '../../components/navPannel';


// limitToBounds={false}
function HorusHerasy() {
    return (
        <>
        <NavPannel />
        <div className='body'>
        <TransformWrapper initialScale={3} initialPositionX={0} initialPositionY={0} minPositionX={-200} maxPositionX={2000} minPositionY={-200} maxPositionY={2000}>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
                <div className="navButton">
                    <button onClick={() => zoomIn()}>+</button>
                    <button onClick={() => zoomOut()}>-</button>
                </div>
                <TransformComponent  wrapperStyle={{minWidth: "200vh",minHeight: "200vh",}} 
                contentStyle={{minWidth: "200vh",minHeight: "200vh",}}>
                {/* wrapperStyle={{height:"12000px",width:"12556px"}} contentStyle={{height:"12000px",width:"12556px"}} */}
                 {/*w-screen h-screen min-h-full min-w-full*/} {/* style={{height:"12000px",width:"12556px"}} */}
                    {horusHeresyDataBooks.map(( data, index ) => {
                            return <Book key={index+"book"+data.id} {...data}/>
                        }
                    )}
                    
                    {horusHeresyDataArrow.map(( data, index ) => {                          
                            return <Arrow key={index+"arrow"+data.id} {...data}/>
                        }
                    )}
                    <div style={{height:"2000px",width:"2000px",background:"purple"}}>
                        test
                    </div>
                
                </TransformComponent>
            </React.Fragment>
        )}
        </TransformWrapper>
        </div>
        </>
  );
}

export default HorusHerasy;