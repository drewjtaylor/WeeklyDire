import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSkullCrossbones} from '@fortawesome/free-solid-svg-icons'
import {Container, Col, Row} from 'reactstrap';

const Error = ({errorMessage}) => {
  return (
    <Container>
        <Row className="align-items-center">
            <Col xs={1}>
                <FontAwesomeIcon icon={faSkullCrossbones} style={{height: '75', width: '75'}} />
            </Col>
            <Col>
                <h2>Sorry--there was an error</h2>
                <p>Error message: {errorMessage}</p>
            </Col>
        </Row>
    </Container>
  )
}

export default Error