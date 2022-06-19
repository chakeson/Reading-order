import React, {useContext, useEffect, useState } from "react";
import fetchBookDataGet from "./util/fetchBookDataGet";
import fetchBookDataPut from "./util/fetchBookDataPut";
import fetchBookDataPatch from "./util/fetchBookDataPatch";
import { jwtTokenIsExpired } from "./util/JWTDate";

/*type ProviderType = {
    horusHeresy:[],
    siegeOfTerra:[]
}*/

export interface authObject {
        jwt:string;
}

export interface syncObject {
    color:string;
    message:string;
    status:string;
}

export interface readingProgressType {
    horusHeresy:number[];
    inquisitors:number[];
    imperialGuard:number[];
}


const AppContext = React.createContext({});

// Array filled with 0 length 299
// Array.apply(null, Array(299)).map(function (x) { return 0; });
const createEmptyReadingProgressArray = () => {
    return { horusHeresy:Array.apply(null, Array(300)).map(function (x) { return 0; }), inquisitors:Array.apply(null, Array(100)).map(function (x) { return 0; }), imperialGuard:Array.apply(null, Array(100)).map(function (x) { return 0; })};
}

const storageAccess = () => {
    var lsReadingProgress:readingProgressType = createEmptyReadingProgressArray();

    if (localStorage.getItem("ReadingProgress")){
        let lsTemp:string = localStorage.getItem("ReadingProgress") || "";
        lsReadingProgress = JSON.parse(lsTemp);
    }
    return lsReadingProgress;
}
// Storage updating is done in the components change readingProgress. Since useEffect wont trigger on here on change of the States 

// Check if local storage has user credentials.
const storageAccessUser = () => {
    if (localStorage.getItem("Login")){
        let lsTemp:string = localStorage.getItem("Login") || "";
        return JSON.parse(lsTemp);
    }
    return {"jwt":""};
}


//LOAD data on page load with GET request
const AppProvider: React.FC = ({ children }) => {
    const [readingProgress, setReadingProgress] = useState<readingProgressType>(storageAccess());
    const [auth, setAuth] = useState<authObject>(storageAccessUser()); // {username:string, password:string}
    const [ isSignedIn , setIsSignedIn ] = useState<boolean>((auth.jwt !== ""));
    const [ syncStatus, setSyncStatus ] = useState<syncObject>({color:"#FFFFFF", message:"", status:""});

    // For testing as logged in user
    //const [auth, setAuth] = useState<authObject>({email:"test@test.com",password:"Password1!"}); // {username:string, password:string}
    //const [ isSignedIn , setIsSignedIn ] = useState<boolean>(true);
    

    // On intial load if user is signed in, load the reading progress from the server.
    useEffect(() => {
        if (isSignedIn){
            // Check if token has expired.
            if (jwtTokenIsExpired(auth)){
                // If token is expired, sign out.
                handleLogout(true);
            }
            else{
                fetchBookDataGet(auth, setReadingProgress, setSyncStatus);
            }
        }
    }, []);


    // Saves auth state to local storage.
    const saveLogin = (jwt:string) => {
        let stringData = JSON.stringify({ "jwt":jwt });
        localStorage.setItem('Login', stringData);
    }

    var interValTrackerVariable: ReturnType<typeof setInterval>;
    const saveReadingProgress = async () => {
        // When changes to the saved books happen we wanna save that to the server if the user is signed in.
        // We dont want to spam the server with requests for everychange, so we wait 10s and send it.
        // But if a change occurs during those 10s we wanna restart the timer and wait another 10s.
        
        // Check if user is not logged in.
        if (!isSignedIn) {
            setSyncStatus({color:"#FFFFFF",message:"Register or sign in to permantly save progress.", status:""});
            return;
        }
        
        //Check if timer is already running.
        if (interValTrackerVariable){
            // Clear previous timer and create a new one to reset the time to 10s.
            clearInterval(interValTrackerVariable);
            interValTrackerVariable = setInterval(() => {
                fetchBookDataPut(auth, readingProgress, setSyncStatus);
                clearInterval(interValTrackerVariable);
            } , 10000);
        }
        else { // If no timer running start a new one.
            interValTrackerVariable = setInterval(() => {
                fetchBookDataPut(auth, readingProgress, setSyncStatus);
                clearInterval(interValTrackerVariable);
            } , 10000);
        }
    }
    
    const handleLogout = async ( skipServerCall=false ) => {
        // Stop server saving with PUT requests.
        // Save to server with PUT requests.

        if (interValTrackerVariable){
            // Clear interval for saving to server.
            clearInterval(interValTrackerVariable);
        }
        if (!skipServerCall){
            await fetchBookDataPut(auth, readingProgress, setSyncStatus);
            fetchBookDataPatch(auth);
        }
        setIsSignedIn(false);
        setAuth({"jwt":""});
        let stringUser = JSON.stringify({"jwt":""});
        localStorage.setItem('Login', stringUser);

        let stringReadingProgress = createEmptyReadingProgressArray();
        localStorage.setItem('ReadingProgress', JSON.stringify(stringReadingProgress));
        setReadingProgress(stringReadingProgress);
    }

    return (
        <AppContext.Provider value={{ readingProgress , setReadingProgress, saveReadingProgress , auth, setAuth, saveLogin , isSignedIn , setIsSignedIn , handleLogout, syncStatus, setSyncStatus }}>
            {children}
        </AppContext.Provider>
    )
}
//Fix typing TODO
export const useGlobalContext = ():any => {
    return useContext(AppContext)
  }
export { AppContext, AppProvider }






/*
// Check if local storage has user credentials.
const storageAccessUser = () => {
    if (localStorage.getItem("Login")){
        let lsTemp:string = localStorage.getItem("Login") || "";
        let lsUser = JSON.parse(lsTemp);
        
        // Check so its not empty then check if the token is expired. If so, remove the token in localstorage and return blank one.
        if ( lsTemp !== "" && jwtTokenIsExpired(lsUser) ){
            localStorage.setItem( 'Login', JSON.stringify({"jwt":""}) );
            return {"jwt":""}
        }

        return lsUser;
    }
    return {"jwt":""};
}
*/