import ArticleCard from "../Components/ArticleCard";
import { selectArticlesByTag } from "../sampledbOperations";
import {Row, Col, Container} from 'reactstrap';
import {Link, useParams} from 'react-router-dom';


const TaggedArticles = () => {
    const {selectedTag} = useParams(); // Comes from 'read/tags/:selectedTag' on App.js
    const taggedArticles = selectArticlesByTag(selectedTag); // returns an array of articles with that tag

    // Copied mostly from "Homepage", which just shows all/featured articles
    // This example just shows articles based on the "tag(s)" provided by user
  return (
    <div>
        <h1>The chosen tag is {selectedTag}</h1>
        <Container>
            <Row>
                <Col md='6' className="mb-5">
                    {taggedArticles.map((article) => {
                        return (
                            <Col md='6' className="mb-5">
                                    <Link to={`/read/${article.id}`}>
                                    <ArticleCard key={article.id} article={article}/>
                                </Link>
                            </Col>
                        )
                    })}
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default TaggedArticles