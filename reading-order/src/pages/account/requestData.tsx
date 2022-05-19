import { useState } from "react";
import { useGlobalContext } from "../../context";
import fetchRequestDataGet from "../../util/fetchRequestDataGet";


function RequestData() {
    const [ rawData, setRawData ] = useState<string>("");
    const { auth } = useGlobalContext();

    const handleSubmit = async () => {
        var requestResponse = await fetchRequestDataGet(auth);
        setRawData(requestResponse)
    }

    return (
        <>
            <button onClick={()=>handleSubmit()}>Request my data</button>
            {rawData!=="" && <p>All data:</p>}
            {rawData!=="" && <p className="w-2/4 break-all">{rawData}</p>}
        </>
    );
}

export default RequestData;