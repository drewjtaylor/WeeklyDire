import { useEffect, useState, useContext } from "react";
import { selectAllDbArticles, selectAllUsers } from "../sampledbOperations";


const Admin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [articles, setArticles] = useState([]);
    const [users, setUsers] = useState([]);

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
                const fetchedUsers = await selectAllUsers();
                setUsers(fetchedUsers);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setErrorMessage(error.message);
                console.error('Error fetching articles: ', error)
            }
        };

        fetchArticleData();
        fetchUsersData();
    }, [])

    return (
        <div>
            <h1>Users</h1>
            {users.map(user => <p>{user.firstName}</p>)}
            <h1>Articles</h1>
            {articles.map(article => <p>{article.title}</p>)}
        </div>
    )
}

export default Admin