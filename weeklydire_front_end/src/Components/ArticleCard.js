import {
    Card, 
    CardImg, 
    CardBody, 
    CardTitle, 
    // CardText
} 
from 'reactstrap';
import logo from '../Assets/WeeklyDireLogoGradient.png';

const ArticleCard = ({article}) => {
    const {title, thumbnail} = article;

    return (
    <Card className='h-100 shadow zoom'>
            <CardImg src={thumbnail ? thumbnail : logo} className='mh-100'/>
        <CardBody>
            <CardTitle><strong>{title}</strong></CardTitle>
        </CardBody>
    </Card>
  )
}

export default ArticleCard