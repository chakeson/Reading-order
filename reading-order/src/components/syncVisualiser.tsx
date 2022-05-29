import { useEffect } from "react";
import { useGlobalContext } from "../context";

// Display to the sure that data is saving or saved.
// TODO style with CSS


function SyncVisualiser() {
    const { syncStatus, setSyncStatus } = useGlobalContext();


    useEffect(() => {
        // Removes message after certain time.
        setTimeout(() => {
            setSyncStatus({color:"#FFFFFF", message:""});
        }, 10000);
    }, [syncStatus.message]);



    return ( 
        <div className={`${syncStatus.message==="" ? "opacity-0" : "opacity-90"} absolute flex justify-center items-center bottom-1/4 mx-auto right-0 left-0 w-24 border-solid border-1 rounded-2xl border-black z-30 font-medium`} style={{backgroundColor:syncStatus.color}}>
            {syncStatus.message}
        </div>
    );
}

export default SyncVisualiser;
