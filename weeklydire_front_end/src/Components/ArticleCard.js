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
    <Card>
        <CardImg src={thumbnail}/>
        <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardText>{body}</CardText>
        </CardBody>
    </Card>
  )
}

export default ArticleCard