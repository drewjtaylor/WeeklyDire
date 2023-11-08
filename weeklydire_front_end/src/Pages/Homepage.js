import ArticleCard from "../Components/ArticleCard";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { selectAllDbArticles } from "../sampledbOperations";
import {Row, Col, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import { useEffect, useState } from "react";


const Homepage = () => {

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch articles from database and update "isLoading"
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedArticles = await selectAllDbArticles();
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
                        <h1>Welcome to Weeklydire</h1>
                        <p>A demo news site about how real people overcome tragedy.</p>
                    </Col>
                </Row>
                <Row>
                    {articles.map((article) => {
                        return (
                            <Col md='6' className="mb-5" key={article._id}>
                                <Link to={`/read/${article._id}`}>
                                    <ArticleCard key={article._id} article={article}/>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
  )
}

export default Homepage