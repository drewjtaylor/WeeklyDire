import {
    Card, 
    // Container, 
    // Row, 
    // Col, 
    CardImg, 
    CardBody, 
    CardTitle, 
    CardText} 
from 'reactstrap';
import logo from '../Assets/WeeklyDireLogoGradient.png';

const ArticleCard = ({article}) => {
    const {body, title, thumbnail} = article;

    return (
    <Card className='h-100 shadow zoom'>
            <CardImg src={thumbnail ? thumbnail : logo} className='mh-100'/>
        <CardBody>
            <CardTitle>{title}</CardTitle>
        </CardBody>
    </Card>
  )
}

export default ArticleCard