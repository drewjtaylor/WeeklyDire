import {
    Card, 
    CardImg, 
    CardBody, 
    CardTitle
} 
from 'reactstrap';
import logo from '../Assets/WeeklyDireLogoGradient.png';

const ArticleCard = ({article}) => {
    const {title, thumbnail} = article;

    return (
    <Card className='h-100 shadow zoom'>
        <CardImg src={thumbnail ? thumbnail : logo} className='mh-100' loading='lazy'/>
        <CardBody>
            <CardTitle><strong>{title}</strong></CardTitle>
        </CardBody>
    </Card>
  )
}

export default ArticleCard