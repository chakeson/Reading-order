import React, { useRef } from 'react';
import '../../index.css';
import { Space } from 'react-zoomable-ui';
import Book from '../../components/book';
import Arrow from '../../components/arrow';
import Shortcut from '../../components/shortcut';
import Zone from '../../components/zone';
import horusHeresyDataBooks, { horusHeresyDataArrow , horusHeresyDataShortcut, horusHeresyDataZone } from './horusHeresyData'; 
import NavPannel from '../../components/navPannel';
import { Xwrapper , useXarrow } from 'react-xarrows';
import Test from '../../components/test';

// limitToBounds={false}
function HorusHerasy() {
    /*
    const updateXarrow = useXarrow();

    useLayoutEffect(() => {
        function updateSize() {
            updateXarrow()
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
      }, []);
    */  
    /*
    var test = spaceRef.current?.viewPort?.zoomFactor
    console.log(test);
    */
    const spaceRef = useRef<Space | null>(null)

    return (
            <>
            <div className="map-height">
            <NavPannel />

            <Space ref={spaceRef} onCreate={vp => {vp.setBounds({ x:[0,11500], y:[0,8500] }); vp.camera.centerFitAreaIntoView({ left: 0, top: 0, width: 6000, height: 6000});}} style={{ backgroundColor: '#F2F2F2' }} innerDivStyle={{ width: 11500, height: 8500 }}>
                <div style={{top:`0px`,left:`8760px`,width:`0px`,height:`100%`,border:"5px dashed #b09642"}} className='absolute'></div>
                <h3 style={{top:`110px`,left:`8100px`}} className='absolute text-8xl'>Horus Heresy</h3>
                <h3 style={{top:`110px`,left:`8880px`}} className='absolute text-8xl'>Siege Of Terra</h3>
                
                <button onClick={()=>console.log(spaceRef.current?.viewPort?.zoomFactor)} style={{top:`2000px`,left:`2000px`,width:`200px`,height:`200px`,border:"5px dashed #b09642"}} className='absolute'>test</button>

                <Xwrapper>
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
                
                {/*<Test/>*/}

                {horusHeresyDataArrow.map(( data, index ) => {
                        var test:any = {...data, scale: spaceRef.current?.viewPort?.zoomFactor }
                        return <Arrow key={index+"arrow"+data.id} {...test}/>
                    }
                )}
                </Xwrapper>
            </Space>
            </div>
            </>
  );
}

export default HorusHerasy;