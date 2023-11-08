import { useEffect, useState, useContext } from "react";
import { selectAllDbArticles, selectAllUsers } from "../sampledbOperations";
import { useCookies } from "react-cookie";
import {Container, Col, Row, Table} from 'reactstrap';

const Admin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [articles, setArticles] = useState([]);
    const [users, setUsers] = useState([]);
    const [cookies] = useCookies();


    // Function to find the username of the creator
    const findCreatorUsername = (creatorId) => {
        const user = users.find((user) => user._id === creatorId);
        return user ? user.username : "Unknown";
  };


    // Get users and articles
    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                const fetchedArticles = await selectAllDbArticles();
                setArticles(fetchedArticles);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setErrorMessage(error.message);
                console.error('Error fetching articles: ', error)
            }
        };
        const fetchUsersData = async () => {
            try {
                const fetchedUsers = await selectAllUsers(cookies.jwt);
                setUsers(fetchedUsers);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setErrorMessage(error.message);
                console.error('Error fetching users: ', error)
            }
        };

        fetchArticleData();
        fetchUsersData();
    }, [cookies.jwt])

    return (
        <Container>
            <Row><h1>Users</h1></Row>
            <Table bordered>
                <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Creator?</th>
                    <th>Admin?</th>
                </tr>
                {users.map((user, idx) => <tr key={idx}>
                    <td>{user.username}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.creator ? 'Yes' : 'No'}</td>
                    <td>{user.admin ? 'Yes' : 'No'}</td>
                </tr>)}
            </Table>

            <Row><h1>Articles</h1></Row>
            <Table bordered>
                <tr>
                    <th>Title</th>
                    <th>Creator</th>
                    <th>Tags</th>
                </tr>
            {articles.map((article, idx) => 
                <tr key={idx}>
                    <td>{article.title}</td>
                    <td>
                        {findCreatorUsername(article.creator)}
                    </td>
                    <td>
                    {article.tags.length === 0 ? 'None' : 
                        article.tags.map((tag, index, fullList) => {
                            return index === fullList.length-1 ?
                                <div className="m-0 p-0" key={index}>{`${tag.toUpperCase()}`}</div> : 
                                <div className="m-0 p-0" key={index}>{`${tag.toUpperCase()}, `}</div>
                        })
                    }
                        
                    </td>
                </tr>)}

            </Table>
        </Container>
    )
}

export default Admin