import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

ReactDOM.render(
    <React.StrictMode>
        <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0}>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
                <div className="tools">
                    <button onClick={() => zoomIn()}>+</button>
                    <button onClick={() => zoomOut()}>-</button>
                    <button onClick={() => resetTransform()}>x</button>
                </div>
                <TransformComponent>
                    <App />
                </TransformComponent>
             </React.Fragment>
        )}
        </TransformWrapper>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
