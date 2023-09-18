import {Container, Row, Col} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookSquare, faInstagramSquare, faXTwitter} from '@fortawesome/free-brands-svg-icons';
import gradientLogo from '../Assets/WeeklyDireLogoGradient.png';

const Footer = () => {
  return (
    <footer style={footerStyle}>
        <Container>
            <Row>
                <Col sm='3' className='text-center'>
                    <h3>Social Media</h3>
                    <h5>
                        <FontAwesomeIcon icon={faFacebookSquare} style={{color: "#ffffff"}} />{'  '}
                        <FontAwesomeIcon icon={faInstagramSquare} style={{color: "#ffffff"}} />{'  '}
                        <FontAwesomeIcon icon={faXTwitter} style={{color: "#ffffff"}} />
                    </h5>

                </Col>
                <Col sm='6' />
                <Col sm='3'><img className='img-fluid logo' src={gradientLogo}  /></Col>
            </Row>
        </Container>
    </footer>
  )
}

const footerStyle = {
    backgroundColor: '#272727',
    color: 'white',
    position: 'absolute',
    width: '100%'
}

export default Footer