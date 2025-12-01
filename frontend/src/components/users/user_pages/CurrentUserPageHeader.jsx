import { useContext } from "react"
import { CurrentUser } from "../../../context/CurrentUser"
import { ButtonToolbar } from "react-bootstrap";

const CurrentUserPageHeader = () => {
    const { currentUser } = useContext(CurrentUser);

    return (
        <div id="current-user-page-header">
            <h1>Hi, {currentUser.username}</h1>
            <ButtonToolbar>
                <Button href={`/user-page/${currentUser.username}/edit-account`}>Edit Account</Button>
                <Button href={`/games/log-new-game`}>Log Game</Button>
            </ButtonToolbar>
        </div>
    );
}

export default CurrentUserPageHeader;