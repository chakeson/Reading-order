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
            <button className="mb-4 w-full h-10 text-lg font-medium rounded-xl text-white shadow-sm shadow-black bg-black hover:bg-grey-900" onClick={()=>handleSubmit()}>Request my data</button>
            {rawData!=="" && <p className="w-full text-xl font-semibold">All data:</p>}
            {rawData!=="" && <p className="w-full break-all mb-4 p-1 border-solid border-2">{rawData}</p>}
        </>
    );
}

export default RequestData;