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
            <NavPannel />
            <Space onCreate={vp => vp.setBounds({ x:[0,10000], y:[0,10000] })} style={{ backgroundColor: '#F2F2F2' }} innerDivStyle={{ width: 10000 }}>
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
            </Space>
            </>
  );
}

export default HorusHerasy;