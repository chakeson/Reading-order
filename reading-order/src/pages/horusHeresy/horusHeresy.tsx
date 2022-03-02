import React from 'react';
import '../../index.css';
import { Space } from 'react-zoomable-ui';
import Book from '../../components/book';
import Arrow from '../../components/arrow';
import Shortcut from '../../components/shortcut';
import Zone from '../../components/zone';
import horusHeresyDataBooks, { horusHeresyDataArrow , horusHeresyDataShortcut, horusHeresyDataZone } from './horusHeresyData'; 
import NavPannel from '../../components/navPannel';


// limitToBounds={false}
function HorusHerasy() {
    return (
            <>
            <div className="map-height">
            <NavPannel />

            <Space onCreate={vp => {vp.setBounds({ x:[0,11500], y:[0,8500] }); vp.camera.centerFitAreaIntoView({ left: 0, top: 0, width: 6000, height: 6000});}} style={{ backgroundColor: '#F2F2F2' }} innerDivStyle={{ width: 11500, height: 8500 }}>
                
                <div style={{top:`0px`,left:`8760px`,width:`0px`,height:`100%`,border:"5px dashed #b09642"}} className='absolute'></div>
                <h3 style={{top:`110px`,left:`8100px`}} className='absolute text-8xl'>Horus Heresy</h3>
                <h3 style={{top:`110px`,left:`8880px`}} className='absolute text-8xl'>Siege Of Terra</h3>

                {horusHeresyDataZone.map(( data, index ) => {
                            return <Zone key={index+"zone"+data.id} {...data}/>
                        }
                    )}
                                
                {horusHeresyDataBooks.map(( data, index ) => {
                        return <Book key={index+"book"+data.id} {...data}/>
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
            </div>
            </>
  );
}

export default HorusHerasy;