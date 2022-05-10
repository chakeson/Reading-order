import React, {useContext, useState } from "react";


/*type ProviderType = {
    horusHeresy:[],
    siegeOfTerra:[]
}*/

interface authObject {
    email:string;
    password:string;
}

const AppContext = React.createContext({});

// Array filled with 0 length 299
// Array.apply(null, Array(299)).map(function (x) { return 0; });

const storageAccess = () => {
    var lsReadingProgress:number[] = Array.apply(null, Array(300)).map(function (x) { return 0; });
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


const saveReadingProgressPUT = async (auth:authObject, readingProgress:number[]) => {
    // TODO set up correct response and error codes.
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/books`, {
            method: 'PUT',
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
                book: JSON.stringify(readingProgress)
            })
        });

        const message = await response?.text();
        if (response.ok) {
            if (message === "Valid credentails.") {

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

//LOAD data on page load with GET request
const AppProvider: React.FC = ({ children }) => {
    const [readingProgress, setReadingProgress] = useState<number[]>(storageAccess());
    const [auth, setAuth] = useState<authObject>(storageAccessUser()); // {username:string, password:string}
    const [ isSignedIn , setIsSignedIn ] = useState<boolean>((auth.email !== ""));

    // Saves auth state to local storage.
    const saveLogin = () => {
        let stringData = JSON.stringify(auth);
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
                saveReadingProgressPUT(auth, readingProgress);
                clearInterval(interValTrackerVariable);
            } , 10000);
        }
        else { // If no timer running start a new one.
            interValTrackerVariable = setInterval(() => {
                saveReadingProgressPUT(auth, readingProgress);
                clearInterval(interValTrackerVariable);
            } , 10000);
        }
    }

    const handleLogout = () => {
        setAuth({"email":"", "password":""});
        setIsSignedIn(false);
        localStorage.removeItem('Login');
        
        // Stop server saving with PUT requests.
    }

    return (
        <AppContext.Provider value={{ readingProgress , setReadingProgress, saveReadingProgress , auth, setAuth, saveLogin , isSignedIn , setIsSignedIn , handleLogout}}>
            {children}
        </AppContext.Provider>
    )
}
//Fix typing TODO
export const useGlobalContext = ():any => {
    return useContext(AppContext)
  }
export { AppContext, AppProvider }