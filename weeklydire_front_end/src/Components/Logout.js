import { useCookies } from "react-cookie";
import { Button } from "reactstrap";


const Logout = () => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const handleLogout = () => {
        removeCookie('jwt')
    }

  return (
    <Button color={'warning'} onClick={handleLogout}>Logout</Button>
  )
}

export default Logout