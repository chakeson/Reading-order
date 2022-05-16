import { useEffect } from "react";
import { useGlobalContext } from "../context";


function SyncVisualiser() {
    const { syncStatus, setSyncStatus } = useGlobalContext();


    useEffect(() => {
        // Removes message after certain time.
        setTimeout(() => {
            setSyncStatus({color:"#FFFFFF", message:""});
        }, 10000);
    }, [syncStatus.message]);



    if (syncStatus.message === "") {
        return(null)
    }
    return ( 
        <div className="absolute flex justify-center items-center bottom-1/4 mx-auto right-0 left-0 w-24 border-solid border-2 border-black z-30" style={{backgroundColor:syncStatus.color}}>
            {syncStatus.message}
        </div> 
    );
}

export default SyncVisualiser;
