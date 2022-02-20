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

            <Space onCreate={vp => {vp.setBounds({ x:[0,10000], y:[0,10000] }); vp.camera.centerFitAreaIntoView({ left: 0, top: 0, width: 5000, height: 5000});}} style={{ backgroundColor: '#F2F2F2' }} innerDivStyle={{ width: 10000, height: 7000 }}>
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