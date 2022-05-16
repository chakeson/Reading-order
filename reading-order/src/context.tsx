import React, {useContext, useState } from "react";


/*type ProviderType = {
    horusHeresy:[],
    siegeOfTerra:[]
}*/

interface authObject {
    email:string;
    password:string;
}

interface syncObject {
    color:string;
    message:string;
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


const saveReadingProgressPUT = async (auth:authObject, readingProgress:number[], setSyncStatus:React.Dispatch<React.SetStateAction<syncObject>>) => {
    // TODO set up correct response and error codes.
    setSyncStatus({color:"#3DED97", message:"Saving..."});
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
            if (message === "Succesful save.") {
                // Update sync save visualiser TODO
                setSyncStatus({color:"#028A0F", message:"Saved"});
            }
        else if (message === "Unauthorized") {
            //await setAuth({"email":"", "password":""});
            //await setIsSignedIn(false); 
            // Update sync save visualiser TODO
            setSyncStatus({color:"#8E1600", message:"Unauthorized"});
        }
        else if (response.redirected) {
            //await setAuth({"email":"", "password":""});
            //await setIsSignedIn(false);
            // Update sync save visualiser TODO
            setSyncStatus({color:"#8E1600", message:"Unauthorized"});
        }
        } else {
            // Update sync save visualiser TODO
            console.log("Error: " + message);
            setSyncStatus({color:"#8E1600", message:"Unauthorized"});
        }
    } catch (error) {     
        let errorText:string = "No Server Response. Check connection.";
        
        if (error instanceof TypeError) {
            errorText = error?.message;
            // Update sync save visualiser TODO
        }
        else {
            // Update sync save visualiser TODO
        }
        setSyncStatus({color:"#8E1600", message:"Unauthorized"});
        console.log("Error: " + errorText);
    }
}

//LOAD data on page load with GET request
const AppProvider: React.FC = ({ children }) => {
    const [readingProgress, setReadingProgress] = useState<number[]>(storageAccess());
    const [auth, setAuth] = useState<authObject>(storageAccessUser()); // {username:string, password:string}
    const [ isSignedIn , setIsSignedIn ] = useState<boolean>((auth.email !== ""));
    const [ syncStatus, setSyncStatus ] = useState<syncObject>({color:"#FFFFFF", message:"sdgsdg"});

    // For testing as logged in user
    //const [auth, setAuth] = useState<authObject>({email:"test@test.com",password:"Password1!"}); // {username:string, password:string}
    //const [ isSignedIn , setIsSignedIn ] = useState<boolean>(true);


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
                saveReadingProgressPUT(auth, readingProgress, setSyncStatus);
                clearInterval(interValTrackerVariable);
            } , 10000);
        }
        else { // If no timer running start a new one.
            interValTrackerVariable = setInterval(() => {
                saveReadingProgressPUT(auth, readingProgress, setSyncStatus);
                clearInterval(interValTrackerVariable);
            } , 10000);
        }
    }
    
    const handleLogout = () => {
        setAuth({"email":"", "password":""});
        setIsSignedIn(false);
        localStorage.removeItem('Login');
        localStorage.removeItem('ReadingProgress');
        // Stop server saving with PUT requests.
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