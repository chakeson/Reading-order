const readCookie = (Name: string) => {
    // Get usuable cookie string and ease spliting with ;
    const cookieString = "; "+document.cookie;
    // Split cookie string based on location of the specific cookie.
    const response = cookieString.split(("; "+Name+"="));
    
    // If the cookie exists in the string should be split into an array of two strings.
    if (response.length ===2 ) {
        // Pop selects the last string in the array. 
        // Then its spilt on ; to get the desired cookie string. The other part of the array is what came after it in the string. 
        // The desired cookie string is then selected by [0]
        return response.pop()?.split(";")[0];
    }
    // If the cookie does not exist in the string, an empty string will be returned.
    return "";
}


export default readCookie;