import Loading from '../Components/Loading';
import {
    Container, 
    Row, 
    Col
} from 'reactstrap';
import { useParams, Link } from 'react-router-dom';
import { selectArticleById, selectUserPublic } from '../sampledbOperations';
import { useEffect, useState } from 'react';
import logo from '../Assets/WeeklyDireLogoGradient.png';
import Comment from '../Components/Comment';

const FullArticle = () => {
    
    // const testComments = [{
    //         body: 'test body',
    //         author: 'test author'
    //     },
    //     {
    //         body: 'test body 2',
    //         author: 'test author 2'
    //     }
    // ];


    const [article, setArticle] = useState({});
    const [creator, setCreator] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {articleId} = useParams();
    // const [comments, setComments] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedArticle = await selectArticleById(articleId);
                setArticle(fetchedArticle);
                setIsLoading(false);
                try {
                    const fetchedCreator = await selectUserPublic(fetchedArticle.creator);
                    setCreator(fetchedCreator);
                } catch (error) {
                    console.error('Error finding the author for this article: ', error)
                };
            } catch (error) {
                console.error('Error fetching your article: ', error)
            };

        };
        fetchData();
    }, [articleId])

    const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    if (isLoading) {
        return <Loading />
    }

    if (article) {
        const {body, title, thumbnail} = article;
        return (
            <Container>
                <Row className='mt-3'>
                    <Col md={{
                        offset: 2,
                        size: 8
                    }}>
                        {thumbnail ? 
                            <img
                                alt={title}
                                src={thumbnail}
                                className='img-fluid mb-3 rounded-3'
                            /> :
                            <img
                                alt='Weekly Dire'
                                src={logo}
                                className='img-fluid mb-3 rounded-3'
                            />}
                    </Col>
                        <Row>
                            <Col>
                                <h2 className='mb-3 text-center'>{title}</h2>
                                <p className='m-0 text-center'><em>{`Written by ${creator.firstName} ${creator.lastName}`}</em></p>
                                <p className='text-center'><em>Date: {formattedDate}</em></p>
                                <p>{body}</p>
                            </Col>
                        </Row>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        Tags: {article.tags.length === 0 ? 'There are no tags for this article.' : 
                            article.tags.map((tag, index, fullList) => {
                                return index === fullList.length-1 ?
                                    <Link to={`/read/tags/${tag}`} key={index}>{`${tag.toUpperCase()}`}</Link> : 
                                    <Link to={`/read/tags/${tag}`} key={index}>{`${tag.toUpperCase()}, `}</Link>
                            })}
                    </Col>
                </Row>
                <Row>
                    <h3>Comments:</h3>
                </Row>
                {/* {comments.map((comment, index) => 
                        <div key={index}>
                            <Col>
                                <p>{comment.body}</p>
                            </Col>
                            <Col>
                                <p>{comment.author}</p>
                            </Col>
                    </div>
                )} */}
            </Container>
        )
    };
}

export default FullArticle