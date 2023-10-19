import Loading from '../Components/Loading';
import {
    Container, 
    Row, 
    Col
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import { selectArticleById } from '../sampledbOperations';
import { useEffect, useState } from 'react';

const FullArticle = () => {

    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {articleId} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedArticle = await selectArticleById(articleId);
                setArticle(fetchedArticle);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching your article: ', error)
            }
        }
        fetchData();
    }, [articleId])

    if (isLoading) {
        return <Loading />
    }

    if (article) {
        const {body, title, thumbnail} = article;
        return (
            <Container>
                <Row className='mt-3'>
                    <Col>
                        {thumbnail ? 
                            <img
                                alt={title}
                                src={thumbnail}
                                className='img-fluid mb-3 rounded-3'
                            />
                            : null}
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