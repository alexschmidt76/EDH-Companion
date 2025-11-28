import { CurrentUser } from "../../../context/CurrentUser";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyPageHeader from './MyPageHeader';
import OtherUserPageHeader from './OtherUserPageHeader';
import UserNotFoundPage from './UserNotFoundPage';

const UserPage = () => {
    const { currentUser } = useContext(CurrentUser);
    const { username, activePage } = useParams(); // these params come from the path
    
    const [user, setUser] = useState(null);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        // if there isn't an active user, get all of the required info of the user whose page this is
        if (!currentUser) {
            // try a fetch call to the api
            (async () => {
                try {
                    const res = await fetch(`${import.meta.env.BACKEND_URL}/users/${username}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const resData = await res.json();

                    setIsUser(true);
                    setUser(resData);
                } catch (error) {
                    console.error("Error fetching user", error);
                }
            })();
        } else {
            setIsUser(true);
            setUser(currentUser);
        }
    }, []);
    
    return (
        // check if the current user is veiwing their own page or another user's page
        <div>
            {
                currentUser && currentUser.username === username
                ? (
                    <MyPageHeader/>
                ) : (
                    isUser
                    ? (
                        <OtherUserPageHeader
                            user={user}
                        />
                    ) : (
                        <UserNotFoundPage/>
                    )
                )
            }
        </div>
    )
}

export default UserPage;