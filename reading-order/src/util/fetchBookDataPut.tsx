import { authObject,syncObject,readingProgressType } from "../context";


const fetchBookDataPut = async (auth:authObject, readingProgress:readingProgressType, setSyncStatus:React.Dispatch<React.SetStateAction<syncObject>>) => {

    setSyncStatus({color:"#3DED97", message:"Saving..."});
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/books`, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Credentials": "true",
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin , Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,HEAD',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': `Bearer ${auth.jwt}`
            },
            credentials: 'include',
            body: new URLSearchParams({
                horusHeresy: JSON.stringify(readingProgress.horusHeresy),
                inquisitors: JSON.stringify(readingProgress.inquisitors),
                imperialGuard: JSON.stringify(readingProgress.imperialGuard)
            })
        });

        const message = await response?.text();
        if (response.ok) {
            if (message === "Succesful save.") {
                setSyncStatus({color:"#028A0F", message:"Saved"});
            }
        else if (message === "Unauthorized") {
            setSyncStatus({color:"#cf171f", message:"Unauthorized"});
        }
        else if (response.redirected) {
            setSyncStatus({color:"#cf171f", message:"Unauthorized"});
        }
        } else {
            console.log("Error: " + message);
            setSyncStatus({color:"#cf171f", message:"Unauthorized"});
        }
    } catch (error) {     
        let errorText:string = "No Server Response. Check connection.";
        
        if (error instanceof TypeError) {
            errorText = error?.message;
        }
        setSyncStatus({color:"#cf171f", message:"Unauthorized"});
        console.log("Error: " + errorText);
    }
}

export default fetchBookDataPut;