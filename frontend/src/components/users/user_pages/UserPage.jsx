import { CurrentUser } from "../../../context/CurrentUser";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import MyPage from './MyPage';
import OtherUserPage from './OtherUserPage';

const UserPage = () => {
    const { currentUser } = useContext(CurrentUser);
    const { username, activePage } = useParams(); // these params come from the path
    
    // check if a user is looking at their own page or another user's page
    if (currentUser.username === username) {
        return (
            <MyPage
                activePage={activePage}
            />
        );
    }

    return (
        <OtherUserPage
            username={username}
            activePage={activePage}
        />
    );
}

export default UserPage;