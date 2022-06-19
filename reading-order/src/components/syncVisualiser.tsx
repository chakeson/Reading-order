import { useEffect } from "react";
import { useGlobalContext } from "../context";
import fetchBookDataPut from "../util/fetchBookDataPut";
import fetchBookDataGet from "../util/fetchBookDataGet";

import { IoIosRefresh } from "react-icons/io";


// Display to the sure that data is saving or saved.
// Status essentially comes from fetchBookDataPut.tsx


function SyncVisualiser() {
    const { syncStatus, setSyncStatus, readingProgress, setReadingProgress, auth } = useGlobalContext();

    var fadeOutTimer:ReturnType<typeof setTimeout>;
    useEffect(() => {
        
        // Stops rerendering after message is cleared. Don't rerender if there is a status message.
        if (syncStatus.message !== "" && syncStatus.status === "") {
            // Removes message after 10 seconds.
            fadeOutTimer = setTimeout(() => {
                setSyncStatus({color:"#FFFFFF", message:"", status:""});
            }, 10000);
        }
        return () => clearTimeout(fadeOutTimer);
        
    }, [syncStatus.message]);

    const handleSaveRetry = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        fetchBookDataPut(auth, readingProgress, setSyncStatus);
    }

    const handleGetProgressRetry = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        fetchBookDataGet(auth, setReadingProgress, setSyncStatus);
    }

    return ( 
        <span className={`${syncStatus.message==="" ? "opacity-0 max-w-0 min-w-0" : "opacity-95 max-w-40 min-w-24"} transform transition duration-300 absolute inline-flex justify-center items-center bottom-1/4 mx-auto right-0 left-0 z-30`}>
            <span className={`${syncStatus.message==="" ? "p-0 border-0" : "px-2 py-1 border-2"} transform transition duration-300 border-solid border-black rounded-md font-medium flex flex-row`} style={{backgroundColor:syncStatus.color}}>
                {syncStatus.status==="" && syncStatus.message}
                {syncStatus.status==="saveFailed" && 
                <>
                <div>{syncStatus.message}</div>
                <button title="Retry save" className="pl-1" onClick={(e)=>{handleSaveRetry(e)}}><IoIosRefresh/></button>
                </>
                }
                {syncStatus.status==="getFailed" && 
                <>
                <div>{syncStatus.message}</div>
                <button title="Retry getting book progress" className="pl-1" onClick={(e)=>{handleGetProgressRetry(e)}}><IoIosRefresh/></button>
                </>
                }
            </span>
        </span>
    );
}

export default SyncVisualiser;