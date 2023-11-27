import { useCookies } from "react-cookie";
import { Button } from "reactstrap";
import { UserContext } from "../utils/UserContext";
import { useContext } from "react";


const Logout = () => {
    // const [cookies, setCookie, removeCookie] = useCookies([]);
    const setCookie = useCookies([])[1];
    const removeCookie = useCookies([])[2]

    // const [userFromContext, setUserFromContext] = useContext(UserContext);
    const setUserFromContext = useContext(UserContext)[1];
    
    const handleLogout = () => {
        removeCookie('jwt');
        setCookie('jwt', null);
        setUserFromContext({});
    }

  return (
    <Button color={'warning'} onClick={handleLogout}>Logout</Button>
  )
}

export default Logout