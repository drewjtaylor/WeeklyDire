import { useState, useEffect, useContext } from "react";
import { UserContext } from "../utils/UserContext";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { Container, Row, Col, Table } from "reactstrap";
import { Link } from "react-router-dom";
import {selectAllDbArticlesByCreator} from '../backendDbOperations';

const MyArticles = () => {
    const [articles, setArticles] = useState([]);
    const [articlesLoading, setArticlesLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [userFromContext] = useContext(UserContext);

    // On page load, get articles for this user
    useEffect(() => {
        const fetchUsersArticles = async () => {
            try {
                const fetchedArticles = await selectAllDbArticlesByCreator(userFromContext._id);
                setArticles(fetchedArticles);
                setArticlesLoading(false);
            } catch (error) {
                setArticlesLoading(false);
                setErrorMessage(error.message);
                console.error("Error fetching articles: ", error);
            }
        };
        fetchUsersArticles();
    }, [userFromContext._id])

    // Deconstruct variables from the logged-in user
    const {
        firstName,
        lastName,
        _id, 
        username
    } = userFromContext;

    // Set up the table of articles written by the logged-in user
    const articlesPerCreatorTable = (
        <>
            <Row id="articles">
                <h1>Articles</h1>
            </Row>
            {articlesLoading ? (<Loading />) : 
            errorMessage ? (<Error errorMessage={errorMessage}/>) :
            <Table bordered>
                <thead>
                    <tr>
                        <th>Title:</th>
                        <th>Tags:</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article, idx) => {
                        return (<tr key={idx}>
                            <td>
                                <Link to={`/read/${article._id}`}>
                                    {article.title}
                                </Link>
                            </td>
                            <td>
                                {article.tags.length === 0
                                ? "None"
                                : article.tags.map((tag, index, fullList) => {
                                    return index === fullList.length - 1 ? (
                                    <div
                                        className="m-0 p-0"
                                        key={index}
                                    >{`${tag.toUpperCase()}`}</div>
                                    ) : (
                                    <div
                                        className="m-0 p-0"
                                        key={index}
                                    >{`${tag.toUpperCase()}, `}</div>
                                    );
                                })}
                            </td>
                            <td>
                                <Link to='/write' state={article}>
                                    Edit
                                </Link>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </Table>
            }
        </>
    );

  return (
    <Container>
        <h3>This is a list of your articles.</h3>
        <h4>Click the green "Edit" button to the right to open a form where you can make changes.</h4>
        <p>You are currently logged in as username: {username}</p>
        {articlesPerCreatorTable}
    </Container>
  )
}

export default MyArticles