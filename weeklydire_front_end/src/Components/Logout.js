import { useCookies } from "react-cookie";
import { Button } from "reactstrap";
import { UserContext } from "../utils/UserContext";
import { useContext } from "react";


const Logout = () => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [user, setUser] = useContext(UserContext);
    
    const handleLogout = () => {
        removeCookie('jwt');
        setUser({})
    }

  return (
    <Button color={'warning'} onClick={handleLogout}>Logout</Button>
  )
}

export default Logout