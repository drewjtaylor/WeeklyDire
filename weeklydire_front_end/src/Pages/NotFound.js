import {Container, Col, Row} from 'reactstrap';

const NotFound = () => {
  return (
    <Container>
        <Row>
            <Col className='text-center'>
                <h1>404: NOT FOUND</h1>
                <h3>Uh oh! It looks like this page doesn't exist</h3>
                <h3>There may be typo in the address bar, or this page may not exist.</h3>
            </Col>
        </Row>
        <Row>
            <Col>

            </Col>
        </Row>

    </Container>
  )
}

export default NotFound