import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../context/CurrentUser";

const Home = () => {
    // redirect user to their own page if there is a user logged in
    const navigate = useNavigate();
    if (CurrentUser) navigate(`/user-page/:${CurrentUser.username}`);

    // home will be an info page for the web app
    return (<div>Give info on web app here in the future</div>);
}

export default Home;