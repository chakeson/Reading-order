import { authObject, readingProgressType } from "../context";

// Deal with failures and successes

const fetchBookDataGet = async ( auth:authObject , setReadingProgress:React.Dispatch<React.SetStateAction<readingProgressType>> ) => {
    // TODO set up correct response and error codes.
    
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/books`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Credentials": "true",
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin , Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,HEAD',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': `Basic ${btoa((auth.email +":"+ auth.password))}`
            },
            credentials: 'include',
        });

        const message = await response?.text();
        
        var bookData = JSON.parse(message);
        // Convert objects strings of arrays to arrays
        bookData.horusHeresy = JSON.parse(bookData.horusHeresy);
        bookData.inquisitors = JSON.parse(bookData.inquisitors);
        bookData.imperialGuard = JSON.parse(bookData.imperialGuard);


        if (response.ok) {           
            
            if (message === "Unauthorized") {
                //await setAuth({"email":"", "password":""});
                //await setIsSignedIn(false); 
            }
            else if (response.redirected) {
                //await setAuth({"email":"", "password":""});
                //await setIsSignedIn(false);
            } else {
                let stringData = JSON.stringify({horusHeresy:bookData.horusHeresy, inquisitors:bookData.inquisitors, imperialGuard:bookData.imperialGuard});
                localStorage.setItem('ReadingProgress', stringData);
                setReadingProgress({horusHeresy:bookData.horusHeresy, inquisitors:bookData.inquisitors, imperialGuard:bookData.imperialGuard});
            }

        } else {
            console.log("Error: " + message);
        }
    } catch (error) {     
        let errorText:string = "No Server Response. Check connection.";
        
        if (error instanceof TypeError) {
            errorText = error?.message;
        }
        console.log("Error: " + errorText);
    }
}

export default fetchBookDataGet;