import React, {useContext, useState , useEffect} from "react";
/*type ProviderType = {
    horusHeresy:[],
    siegeOfTerra:[]
}*/
const AppContext = React.createContext({});

// Array filled with 0 length 299
// Array.apply(null, Array(299)).map(function (x) { return 0; });

const storageAccess = () => {
    var lsReadingProgress:number[] = Array.apply(null, Array(299)).map(function (x) { return 0; });
    if (localStorage.getItem("ReadingProgress")){
        let lsTemp:string = localStorage.getItem("ReadingProgress") || "";
        lsReadingProgress = JSON.parse(lsTemp)
    }
    return lsReadingProgress;
}




const AppProvider: React.FC = ({ children }) => {
    const [readingProgress, setReadingProgress] = useState<number[]>(storageAccess());

    useEffect(() => {
        localStorage.setItem('ReadingProgress', JSON.stringify(readingProgress));
    },[readingProgress])



    return (
        <AppContext.Provider value={{ readingProgress , setReadingProgress }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
  }
export { AppContext, AppProvider }