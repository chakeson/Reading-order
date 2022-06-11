import React, {useContext, useEffect, useState } from "react";
import fetchBookDataGet from "./util/fetchBookDataGet";
import fetchBookDataPut from "./util/fetchBookDataPut";

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
    return {"email":"", "password":""};
}


//LOAD data on page load with GET request
const AppProvider: React.FC = ({ children }) => {
    const [readingProgress, setReadingProgress] = useState<readingProgressType>(storageAccess());
    const [auth, setAuth] = useState<authObject>(storageAccessUser()); // {username:string, password:string}
    const [ isSignedIn , setIsSignedIn ] = useState<boolean>((auth.jwt !== ""));
    const [ syncStatus, setSyncStatus ] = useState<syncObject>({color:"#FFFFFF", message:""});

    // For testing as logged in user
    //const [auth, setAuth] = useState<authObject>({email:"test@test.com",password:"Password1!"}); // {username:string, password:string}
    //const [ isSignedIn , setIsSignedIn ] = useState<boolean>(true);
    
    // On intial load if user is signed in, load the reading progress from the server.
    useEffect(() => {
        if (isSignedIn){
            fetchBookDataGet(auth, setReadingProgress);
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
    
    const handleLogout = async () => {
        // Stop server saving with PUT requests.
        // Save to server with PUT requests.

        await fetchBookDataPut(auth, readingProgress, setSyncStatus);
        
        setIsSignedIn(false);
        setAuth({"jwt":""});
        let stringUser = JSON.stringify({"jwt":""});
        localStorage.setItem('Login', stringUser);

        let stringReadingProgress = createEmptyReadingProgressArray();
        localStorage.setItem('ReadingProgress', JSON.stringify(stringReadingProgress));
        setReadingProgress(stringReadingProgress);
    }

    return (
        <AppContext.Provider value={{ readingProgress , setReadingProgress, saveReadingProgress , auth, setAuth, saveLogin , isSignedIn , setIsSignedIn , handleLogout, syncStatus, setSyncStatus}}>
            {children}
        </AppContext.Provider>
    )
}
//Fix typing TODO
export const useGlobalContext = ():any => {
    return useContext(AppContext)
  }
export { AppContext, AppProvider }