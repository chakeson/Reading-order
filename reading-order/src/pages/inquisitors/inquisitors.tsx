import React, { useRef } from 'react';
import '../../index.css';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Space } from 'react-zoomable-ui';
import Book from '../../components/book';
import Arrow from '../../components/arrow';
import Shortcut from '../../components/shortcut';
import Zone from '../../components/zone';
import inquisitorsDataBooks, { inquisitorsDataArrow, inquisitorsDataShortcut, inquisitorsDataZone } from './InquisitorsData'; 
import NavPannel from '../../components/navPannel';
import SyncVisualiser from '../../components/syncVisualiser';

// limitToBounds={false}
function Inquisitors() {
    const spaceRef = useRef<any>();

    return (
            <>
            <div className="map-height">
            <NavPannel />
            <SyncVisualiser/>
            <Space ref={spaceRef} onCreate={vp => {vp.setBounds({ x:[0,5000], y:[0,5000] }); vp.camera.centerFitAreaIntoView({ left: 0, top: 0, width: 5000, height: 2000});}} style={{ backgroundColor: '#F2F2F2' }} innerDivStyle={{ width: 5000, height: 5000 }}>

                {inquisitorsDataZone.map(( data, index ) => {
                            return <Zone key={index+"zone"+data.id} {...data}/>
                        }
                    )}
                                
                {inquisitorsDataBooks.map(( data, index ) => {
                        return <Book key={index+"book"+data.id} {...data}/>
                    }
                )}
                
                {inquisitorsDataShortcut.map(( data, index ) => {                          
                        return <Shortcut key={index+"Shortcut"+data.id} {...data}/>
                    }
                )}

                {inquisitorsDataArrow.map(( data, index ) => {                          
                        return <Arrow key={index+"arrow"+data.id} {...data}/>
                    }
                )}
                
            </Space>
            <div className="absolute right-5 bottom-5 inline-flex flex-col text-4xl xl:text-4xl lg:text-4xl md:text-3xl sm:text-2xl">
                <button onClick={() => spaceRef.current?.viewPort?.camera.moveBy(0, 0, 0.2)}>
                    <AiOutlinePlusCircle />
                </button>
                <button onClick={() => spaceRef.current?.viewPort?.camera.moveBy(0, 0, -0.2)}>
                    <AiOutlineMinusCircle />
                </button>
            </div>
            
            </div>
            </>
  );
}

export default Inquisitors;