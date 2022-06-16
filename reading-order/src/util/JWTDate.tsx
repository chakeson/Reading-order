import { authObject } from "../context";

export const jwtTokenDecode = (jwt:string) => {
    return JSON.parse(atob(jwt.split('.')[1]));
}

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