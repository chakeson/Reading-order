import React from 'react';
import '../../index.css';
import { Space } from 'react-zoomable-ui';
import Book from '../../components/book';
import Arrow from '../../components/arrow';
import horusHeresyDataBooks, { horusHeresyDataArrow } from './horusHeresyData'; 
import NavPannel from '../../components/navPannel';


// limitToBounds={false}
function HorusHerasy() {
    return (
            <>
            <div className="map-height">
            <NavPannel />

            <Space onCreate={vp => {vp.setBounds({ x:[0,12000], y:[0,8500] }); vp.camera.centerFitAreaIntoView({ left: 0, top: 0, width: 6000, height: 6000});}} style={{ backgroundColor: '#F2F2F2' }} innerDivStyle={{ width: 12000, height: 8500 }}>
                {horusHeresyDataBooks.map(( data, index ) => {
                        return <Book key={index+"book"+data.id} {...data}/>
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