import {Container, Row, Col} from 'reactstrap';
import gradientLogo from '../Assets/WeeklyDireLogoGradient.png';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <Row className='header sticky-top background-gray mb-3'>
            <Col><Link to='/'><img className='img-fluid logo' src={gradientLogo}  /></Link></Col>
            <Col>Sign in/sign up area</Col>
    </Row>
  )
}



export default Header