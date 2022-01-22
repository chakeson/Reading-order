import React, {useContext, useState} from "react";
/*type ProviderType = {
    horusHeresy:[],
    siegeOfTerra:[]
}*/
const AppContext = React.createContext({});

const AppProvider: React.FC = ({ children }) => {
    const [readingProgress, setReadingProgress] = useState<any>(null);

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