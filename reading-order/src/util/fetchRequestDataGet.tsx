import { authObject } from "../context";

const fetchRequestDataGet = async ( auth:authObject ):Promise<string> => {

    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/requestdata`, {
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
        if (response.ok) {           
            
            if (message === "Unauthorized") {
                return "Authentication failed"; 
            }
            else if (response.redirected) {
                return "Authentication failed";
            } else {
                return JSON.stringify(message);
            }

        } else {
            console.log("Error: " + JSON.stringify(message));
        }
    } catch (error) {     
        let errorText:string = "No Server Response. Check connection.";
        
        if (error instanceof TypeError) {
            errorText = error?.message;
        }
        console.log("Error: " + errorText);
        return errorText;
    }
    return "Error failed to get data"
}

export default fetchRequestDataGet;