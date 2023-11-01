import { useCookies } from "react-cookie";
import { Button } from "reactstrap";


const Logout = () => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const handleLogout = () => {
        removeCookie('jwt')
    }

  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default Logout