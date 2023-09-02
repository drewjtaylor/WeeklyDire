import ArticleCard from "../Components/ArticleCard"
import { selectAllArticles } from "../sampledbOperations";
import {Row, Col} from 'reactstrap';

const Homepage = () => {
    console.log(selectAllArticles());

    return (
    <div className='app'>
        <div className="background-gray">
            <h1>Homepage</h1>
            <p>This is sub text</p>
        </div>
        <Col xs='6'>
            <ArticleCard article={selectAllArticles()[0]}/>
        </Col>

    </div>
  )
}

export default Homepage