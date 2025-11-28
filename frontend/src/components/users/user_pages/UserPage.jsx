import { CurrentUser } from "../../../context/CurrentUser";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import MyPage from './MyPage';
import OtherUserPage from './OtherUserPage';

const UserPage = () => {
    // check if a user is looking at their own page or another user's page
    const { currentUser } = useContext(CurrentUser);
    const { username } = useParams(); // this param comes from the path
    if (currentUser.username === username) return (<MyPage/>);
    return (<OtherUserPage/>);
}

export default UserPage;