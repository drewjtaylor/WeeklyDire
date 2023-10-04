import ArticleCard from "../Components/ArticleCard"
import { selectAllArticles, selectAllDbArticles } from "../sampledbOperations";
import {Row, Col, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import { useEffect, useState } from "react";


const Homepage = () => {

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedArticles = await selectAllDbArticles();
                setArticles(fetchedArticles);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching articles: ', error)
            }
        }
        fetchData();
    }, [])

    if (isLoading) {
        return <div>Loading ...</div>
    }

    return (
        <div className='app'>
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
                            <Col md='6' className="mb-5" key={article.id}>
                                    <Link to={`/read/${article.id}`}>
                                    <ArticleCard key={article.id} article={article}/>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
  )
}

export default Homepage