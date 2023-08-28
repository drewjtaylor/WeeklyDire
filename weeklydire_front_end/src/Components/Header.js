import {Container, Row, Col} from 'reactstrap';


const Header = () => {
  return (
    <Container className='header'>
        <Row>
            <Col>Main logo</Col>
            <Col>Sign in/sign up area</Col>
        </Row>
    </Container>
  )
}



export default Header