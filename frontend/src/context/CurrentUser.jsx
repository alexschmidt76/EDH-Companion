// this context will provide the user that is currently 
// logged in to its children

import { createContext, useState, useEffect } from "react";

export const CurrentUser = createContext();

const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    console.log('current user')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/current-user`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(resData => setCurrentUser(resData))
    }, []);

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    );
}

export default CurrentUserProvider;