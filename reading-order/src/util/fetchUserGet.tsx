import React from "react";
import { authObject } from "../context";


const fetchUserGet = async ( email:string , password:string , saveLogin:any ,setAuth:React.Dispatch<React.SetStateAction<authObject>>, setIsSignedIn:React.Dispatch<React.SetStateAction<boolean>>) => {
    var response:Response|undefined;

    try {
        response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/users`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Credentials": "true",
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin , Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,HEAD',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': `Basic ${btoa((email +":"+ password))}`
            },
            credentials: 'include'
        });
        
        return response;
    } catch (error) {     
        let errorText:string = "No Server Response. Check connection.";
        
        if (error instanceof TypeError) {
            errorText = error?.message;
        }
        console.log(errorText);
    }
    return undefined;
}

export default fetchUserGet;