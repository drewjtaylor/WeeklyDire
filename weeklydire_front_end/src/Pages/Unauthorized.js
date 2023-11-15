import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import {Container, Col, Row} from 'reactstrap';


const Unauthorized = () => {
  return (
    <Container>
        <Row className="align-items-center">
            <Col xs={1}>
                <FontAwesomeIcon icon={faEyeSlash} style={{height: '75', width: '75'}} />
            </Col>
            <Col>
                <h2>You are not authorized to view this page.</h2>
                <p>Please sign in to an account that has the correct privileges.</p>
                <p>If you are signed in but believe you should have access to this page, please contact an administrator.</p>
            </Col>
        </Row>
    </Container>
  )
}

export default Unauthorized