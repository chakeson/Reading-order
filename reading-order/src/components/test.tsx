import React from 'react';
import { useXarrow } from 'react-xarrows';





function Test() {
    

    const updateXarrow = useXarrow();

    React.useEffect(() => {
        window.addEventListener("resize", updateXarrow);
        return () => window.removeEventListener("resize", updateXarrow);
    });
    return (  

        <div></div>
    );
}

export default Test;