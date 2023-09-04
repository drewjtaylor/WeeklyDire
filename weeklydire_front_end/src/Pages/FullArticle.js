import {
    Card, 
    Container, 
    Row, 
    Col, 
    Img
} 
from 'reactstrap';
import { useParams } from 'react-router-dom';
import { selectArticleById } from '../sampledbOperations';

const FullArticle = () => {
    const {articleId} = useParams();
    const article = selectArticleById(articleId);
    console.log('article is:')
    console.log(article);
    if (article) {
        const {body, title, thumbnail} = article;
        
        return (
            <Container>
                <Row className='mt-3'>
                    <Col>
                        <img
                            alt={title}
                            src={thumbnail}
                            className='img-fluid mb-3 rounded-3'
                        />
                        <Col>
                            <h5 className='mb-3'>{title}</h5>
                            <p>{body}</p>
                        </Col>
                    </Col>
                </Row>
            </Container>
        )
    };

    return (
        <Container>
            <h3>Sorry, there is no article with an id of {articleId}</h3>
        </Container>
    )
}

export default FullArticle