import React from 'react';
import '../../index.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Book from '../../components/book';
import Arrow from '../../components/arrow';
import horusHeresyDataBooks, { horusHeresyDataArrow } from './horusHeresyData'; 

function HorusHerasy() {
    return (
        <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0}>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
                <div className="navButton">
                    <button onClick={() => zoomIn()}>+</button>
                    <button onClick={() => zoomOut()}>-</button>
                </div>
                <TransformComponent>
                
                    <main className="w-screen h-screen min-h-full min-w-full bg-map">
                    {horusHeresyDataBooks.map(( data, index ) => {
                            return <Book key={index+"book"+data.id} {...data}/>
                        }
                    )}
                    
                    {horusHeresyDataArrow.map(( data, index ) => {                          
                            return <Arrow key={index+"arrow"+data.id} {...data}/>
                        }
                    )}

                </main>
                </TransformComponent>
            </React.Fragment>
        )}
        </TransformWrapper>
  );
}

export default HorusHerasy;