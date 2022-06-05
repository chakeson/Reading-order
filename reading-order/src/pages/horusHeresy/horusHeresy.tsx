import React, { useState , useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../../index.css';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Space } from 'react-zoomable-ui';
import Book from '../../components/book';
import Arrow from '../../components/arrow';
import Shortcut from '../../components/shortcut';
import Zone from '../../components/zone';
import horusHeresyDataBooks, { horusHeresyDataArrow , horusHeresyDataShortcut, horusHeresyDataZone } from './horusHeresyData'; 
import NavPannel from '../../components/navPannel';
import SyncVisualiser from '../../components/syncVisualiser';

// limitToBounds={false}
function HorusHerasy() {
    const spaceRef = useRef<any>();

    // Handles the state from the navpanel. Holds an array with strings of the clicked factions.
    // It's supposed to handle selective faction rendering.
    const [factionFilter, setFactionFilter] = useState<string[]>([]);

    
    // If the page is siege of terra we wanna start zoomed in on that part of the page/map.
    // Else we want to start zoomed out.
    let location = useLocation();
    var cameraStartingPosition = { left: 0, top: 0, width: 6000, height: 6000};
    if (location.pathname === "/siegeofterra") {
        cameraStartingPosition = { left: 9500, top: 3100, width: 1320, height: 1320};
    }

    return (
            <>
            <div className="map-height">
            <NavPannel factionFilter={factionFilter} setFactionFilter={setFactionFilter} />
            <SyncVisualiser/>
            <Space ref={spaceRef} onCreate={vp => {vp.setBounds({ x:[0,11800], y:[0,8500] }); vp.camera.centerFitAreaIntoView({ left: cameraStartingPosition.left, top: cameraStartingPosition.top, width: cameraStartingPosition.width, height: cameraStartingPosition.height});}} style={{ backgroundColor: '#F2F2F2' }} innerDivStyle={{ width: 11800, height: 8500 }}>
                
                {/* Devision slider and side naming. */}
                <div style={{top:`0px`,left:`8760px`,width:`0px`,height:`100%`,border:"5px dashed #b09642"}} className='absolute'></div>
                <h3 style={{top:`110px`,left:`8100px`}} className='absolute text-8xl'>Horus Heresy</h3>
                <h3 style={{top:`110px`,left:`8880px`}} className='absolute text-8xl'>Siege Of Terra</h3>

                {horusHeresyDataZone.map(( data, index ) => {
                            return <Zone key={index+"zone"+data.id} {...data}/>
                        }
                    )}
                                
                {horusHeresyDataBooks.map(( data, index ) => {
                        return <Book key={index+"book"+data.id} {...data} page={"horusHeresy"} factionFilter={factionFilter}/>
                    }
                )}
                
                {horusHeresyDataShortcut.map(( data, index ) => {                          
                        return <Shortcut key={index+"Shortcut"+data.id} {...data}/>
                    }
                )}

                {horusHeresyDataArrow.map(( data, index ) => {                   
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

export default HorusHerasy;