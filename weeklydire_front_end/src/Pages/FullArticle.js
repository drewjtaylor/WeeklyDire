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

const FullArticle = ({article}) => {
    const {id, body, title, thumbnail} = article
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
}

export default FullArticle