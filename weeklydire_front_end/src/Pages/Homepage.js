import ArticleCard from "../Components/ArticleCard"
import { selectAllArticles } from "../sampledbOperations";
import {Row, Col, Container} from 'reactstrap';
import {Link} from 'react-router-dom';

const Homepage = () => {
    const articles=selectAllArticles();

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
                            <Col md='6' className="mb-5">
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