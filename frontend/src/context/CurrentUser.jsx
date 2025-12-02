// this context will provide the user that is currently 
// logged in to its children

import { createContext, useState, useEffect } from "react";

export const CurrentUser = createContext();

const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/current-user`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const resData = await res.json();

                setCurrentUser(resData);
            } catch (error) {
                console.error('Error fetching user', error);
            }
        })();
    }, []);

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    );
}

export default CurrentUserProvider;