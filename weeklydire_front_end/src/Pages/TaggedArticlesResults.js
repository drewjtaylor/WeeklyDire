import ArticleCard from "../Components/ArticleCard";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { selectArticlesByTag } from "../sampledbOperations";
import {Row, Col, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const TaggedArticlesResults = () => {

    const {tag} = useParams();

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch tagged articles from database and update "isLoading"
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedArticles = await selectArticlesByTag(tag);
                setArticles(fetchedArticles);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setErrorMessage(error.message);
                console.error('Error fetching articles: ', error)
            }
        }
        fetchData();
    }, [])


    if (isLoading) {
        return <Loading />
    }

    if (errorMessage !== '') {
        return <Error errorMessage={errorMessage} />
    }

    return (
            <Container>
                <Row>
                    <Col className="text-center">
                        <h1>See your search results below for <strong>{tag}</strong></h1>
                    </Col>
                </Row>
                <Row>
                    {articles.map((article) => {
                        return (
                            <Col md='6' className="mb-5" key={article.id}>
                                    <Link to={`/read/${article.id}`}>
                                    <ArticleCard key={article.id} article={article}/>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
  )
}

export default TaggedArticlesResults