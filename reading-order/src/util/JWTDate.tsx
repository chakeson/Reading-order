import { authObject } from "../context";

// Parses the payload of the JWT token and returns it as an object.
export const jwtTokenDecode = (jwt:string) => {
    if (jwt.length === 0 || jwt === undefined || jwt === null) {
        return {};
    }
    return JSON.parse(atob(jwt.split('.')[1]));
}

// Checks if the token has expired and returns true or false depending on it.
// If there is no token returns undefined.
export const jwtTokenIsExpired = (auth:authObject) => {

    // Check if there is an actual token.
    if ( auth !== undefined && auth.jwt!==undefined && auth.jwt !== "" ){
        let jwtDecoded = jwtTokenDecode(auth.jwt);
        let now = new Date();
        let exp = new Date(jwtDecoded.exp * 1000);
        return exp < now;
    }
    
    return undefined;
}