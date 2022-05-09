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


const AppProvider: React.FC = ({ children }) => {
    const [readingProgress, setReadingProgress] = useState<number[]>(storageAccess());
    const [auth, setAuth] = useState<authObject>(storageAccessUser()); // {username:string, password:string}
    const [ isSignedIn , setIsSignedIn ] = useState<boolean>((auth.email !== ""));

    // Saves auth state to local storage.
    const saveLogin = () => {
        let stringData = JSON.stringify(auth);
        localStorage.setItem('Login', stringData);
    }

    const saveReadingProgress = () => {
        console.log("testFunction");
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