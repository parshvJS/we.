import React, { Children, createContext, useContext, useState } from 'react'



const rootData = {
    topBarTitle: '',
    setTopBarTitle: () => { }
}

const appContext = createContext(rootData)
const AppContext = ({ children }) => {
    const [topBarTitle, setTopBarTitle] = useState('Dashboard');

    
    const value = {
        topBarTitle,
        setTopBarTitle
    }
    return (
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}
export default AppContext;
export const useAppContext = () => useContext(appContext);