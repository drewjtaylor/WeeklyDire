import { useEffect, useState } from "react";
import { selectAllDbArticles, selectAllUsers } from "../sampledbOperations";
import { useCookies } from "react-cookie";
import {Container, Row, Table} from 'reactstrap';
import Loading from '../Components/Loading';
import { Link } from "react-router-dom";

const Admin = () => {
    const [articlesLoading, setArticlesLoading] = useState(true);
    const [usersLoading, setUsersLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [articles, setArticles] = useState([]);
    const [users, setUsers] = useState([]);
    const [cookies] = useCookies();

    // Function to find the username from a creator._id
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
                setArticlesLoading(false);
            } catch (error) {
                setArticlesLoading(false);
                setErrorMessage(error.message);
                console.error('Error fetching articles: ', error)
            }
        };
        const fetchUsersData = async () => {
            try {
                const fetchedUsers = await selectAllUsers(cookies.jwt);
                setUsers(fetchedUsers);
                setUsersLoading(false);
            } catch (error) {
                setUsersLoading(false);
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
            {usersLoading ? <Loading /> : 
                <Table bordered>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Creator?</th>
                            <th>Admin?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => 
                            <tr key={idx}>
                                <td><Link to={`/admin/users/${user._id}`}>Edit</Link></td>
                                <td>{user.username}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.creator ? 'Yes' : 'No'}</td>
                                <td>{user.admin ? 'Yes' : 'No'}</td>
                            </tr>)}
                    </tbody>
                </Table>}
            <Row><h1>Articles</h1></Row>
            {articlesLoading ? <Loading /> : 
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Creator</th>
                            <th>Tags</th>
                        </tr>
                    </thead>
                    <tbody>
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
                    </tbody>
                </Table>
            }
        </Container>
    )
}

export default Admin