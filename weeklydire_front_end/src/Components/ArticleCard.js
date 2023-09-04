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

const ArticleCard = ({article}) => {
    const {body, title, thumbnail} = article;

    return (
    <Card className='h-100'>
        <CardImg src={thumbnail} className='mh-100'/>
        <CardBody>
            <CardTitle>{title}</CardTitle>
        </CardBody>
    </Card>
  )
}

export default ArticleCard