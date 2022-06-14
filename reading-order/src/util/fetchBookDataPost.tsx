import { authObject , readingProgressType } from "../context";

// Intial save to the server to create the book document server side.

const fetchBookDataPost = async ( auth:authObject , readingProgress:readingProgressType  ) => {

    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/books`, {
            method: 'POST',
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
        }
        else {
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

export default fetchBookDataPost;