import {
    Card, 
    Container, 
    Row, 
    Col, 
    CardImg, 
    CardBody, 
    CardTitle, 
    CardText} 
from 'reactstrap';
import { useParams } from 'react-router-dom';
import { selectArticleById } from '../sampledbOperations';

const FullArticle = () => {
    const {articleId} = useParams();
    const article = selectArticleById(articleId);
    console.log('article is:')
    console.log(article);
    if (article) {
        const {id, body, title, thumbnail} = article;
        
        return (
            <Card>
                <CardImg
                    alt={title}
                    src={thumbnail}
                    style={{
                        height: 180,
                        width: 180
                        }}
                    top
                />
                <CardBody>
                    <CardTitle tag='h5'>{title}</CardTitle>
                    <CardText>{body}</CardText>
                </CardBody>
            </Card>
        )
    };

    return (
        <Container>
            <h3>Sorry, there is no article with an id of {articleId}</h3>
        </Container>
    )
}

export default FullArticle