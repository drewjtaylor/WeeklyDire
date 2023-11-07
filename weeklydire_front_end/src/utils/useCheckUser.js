// This custom hook checks the current user using whatever jwt 
// is currently stored in cookies
// The function needs to be fed "user, setUser" from useState on the main app

// i.e.
// const [user, setUser] = useState({});
// useCheckUser(user, setUser);

import { useCookies } from "react-cookie";
import { useEffect } from 'react';
import { dbUrl } from './dbUrl';

const useCheckUser = (user, setUser) => {
    const [cookies] = useCookies();

    useEffect(
        () => {
        if (cookies.jwt) {
            const checkUser = async () => {
                // Default options are marked with *
                const response = await fetch(dbUrl + '/users/current', {
                method: "GET",
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies.jwt}`
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: null, // body data type must match "Content-Type" header
                });
                return response.json(); // parses JSON response into native JavaScript objects
            }
            const fetchUser = async () => {
                const initialUser = await checkUser();
                setUser(initialUser);
            };
            fetchUser();
        }
    }, [setUser, cookies.jwt]);
    return user
}

export default useCheckUser