import { authObject , readingProgressType } from "../context";

// Deal with failures and successes

//, setSyncStatus:React.Dispatch<React.SetStateAction<syncObject>>
const fetchBookDataPost = async ( auth:authObject , readingProgress:readingProgressType  ) => {
    // setSyncStatus({color:"#3DED97", message:"Saving..."});
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/books`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Credentials": "true",
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin , Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,HEAD',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': `Basic ${btoa((auth.email +":"+ auth.password))}`
            },
            credentials: 'include',
            body: new URLSearchParams({
                horusHeresy: JSON.stringify(readingProgress.horusHeresy),
                inquisitor: JSON.stringify(readingProgress.inquisitor),
                imperialGaurd: JSON.stringify(readingProgress.imperialGaurd)
            })
        });

        const message = await response?.text();
        if (response.ok) {
            if (message === "Succesful save.") {
                // setSyncStatus({color:"#028A0F", message:"Saved"});
            }
        else if (message === "Unauthorized") {
            //await setAuth({"email":"", "password":""});
            //await setIsSignedIn(false); 
            // setSyncStatus({color:"#8E1600", message:"Unauthorized"});
        }
        else if (response.redirected) {
            //await setAuth({"email":"", "password":""});
            //await setIsSignedIn(false);
            // setSyncStatus({color:"#8E1600", message:"Unauthorized"});
        }
        } else {
            // Update sync save visualiser TODO
            console.log("Error: " + message);
            //setSyncStatus({color:"#8E1600", message:"Unauthorized"});
        }
    } catch (error) {     
        let errorText:string = "No Server Response. Check connection.";
        
        if (error instanceof TypeError) {
            errorText = error?.message;
            // Update sync save visualiser TODO
        }
        //setSyncStatus({color:"#8E1600", message:"Unauthorized"});
        console.log("Error: " + errorText);
    }
}

export default fetchBookDataPost;