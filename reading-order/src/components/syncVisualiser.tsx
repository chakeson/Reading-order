import { useEffect } from "react";
import { useGlobalContext } from "../context";

// Display to the sure that data is saving or saved.
// Status essentially comes from fetchBookDataPut.tsx


function SyncVisualiser() {
    const { syncStatus, setSyncStatus } = useGlobalContext();

    useEffect(() => {
        // Removes message after 10 seconds.
        setTimeout(() => {
            setSyncStatus({color:"#FFFFFF", message:""});
        }, 10000);
    }, [syncStatus.message]);

    return ( 
        <span className={`${syncStatus.message==="" ? "opacity-0" : "opacity-95"} transform transition duration-300 absolute inline-flex justify-center items-center bottom-1/4 mx-auto right-0 left-0 max-w-40 min-w-24 z-30`}>
            <span className="px-2 py-1 border-solid border-2 border-black rounded-md font-medium" style={{backgroundColor:syncStatus.color}}>
                {syncStatus.message}
            </span>
        </span>
    );
}

export default SyncVisualiser;
