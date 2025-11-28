import { CurrentUser } from "../../../context/CurrentUser";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyPageHeader from './MyPageHeader';
import OtherUserPageHeader from './OtherUserPageHeader';
import UserPageNavBar from "./UserPageNavBar";
import Games from '../Games';
import Pods from '../Pods';
import UserStats from './UserStats';
import Error404 from '../Error404';

const UserPage = () => {
    const navigate = useNavigate();

    const { currentUser } = useContext(CurrentUser);
    const { username, activePage } = useParams(); // these params come from the path
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        // redirect if no username was passed in the path parameters and there isnt a current user
        if (!username && !currentUser) navigate('/user-page/user-not-found');
        
        // if there isn't an current user or the current user is trying to view another user's page, 
        // get all of the required info of the user whose page this is
        if (!currentUser || currentUser.username !== username) {
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

                    setUser(resData);
                } catch (error) {
                    console.error("Error fetching user", error);
                }
            })();

            // redirect if user was not found
            if (!user) navigate('/user-page/user-not-found');
        } else {
            setUser(currentUser);
        }
    }, []);
    
    return (
        <div id="user-page">
            {/* check if the current user is veiwing their own page or another user's page */}
            <div id="user-page-header">
                {
                    currentUser && currentUser.username === username
                    ? (
                        <MyPageHeader/>
                    ) : (
                        <OtherUserPageHeader
                            user={user}
                        />
                    )
                }
            </div>
            <UserPageNavBar/>
            {/* check which user info to show based on path parameteres, default info is games */}
            <div id='user-page-contents'>
                {
                    activePage === 'games' || !activePage
                    ? (
                        <Games
                            user={user}
                        />
                    ) : (
                        activePage === 'pods'
                        ? (
                            <Pods
                                user={user}
                            />
                        ) : (
                            activePage === 'stats'
                            ? (
                                <UserStats
                                    user={user}
                                />
                            ) : (
                                <Error404/>
                            )
                        )
                    )
                }
            </div>
        </div>
    );
}

export default UserPage;