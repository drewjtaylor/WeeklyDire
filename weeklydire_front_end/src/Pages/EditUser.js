import Loading from '../Components/Loading';
import {
    Container, 
    Row, 
    Col
} from 'reactstrap';
import { useParams, Link } from 'react-router-dom';
import { selectUser } from '../sampledbOperations';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const EditUser = () => {

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {userId} = useParams();
    const [cookies] = useCookies();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUser = await selectUser(userId, cookies.jwt);
                console.log(fetchedUser);
                setUser(fetchedUser);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching your user: ', error)
            }
        }
        fetchData();
    }, [userId, cookies.jwt])


  return (
    isLoading ? <Loading /> : 
    <div>
        <p>Edit User with ID {userId}</p>
        <p>Full user information:</p>
        <p>{JSON.stringify(user)}</p>
    </div>
  )
}

export default EditUser