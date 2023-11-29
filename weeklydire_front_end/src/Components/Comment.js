import {Row, Col} from 'reactstrap';

const Comment = ({body, author}) => {
    console.log(body);
    console.log(author);
  return (
    <>
        <Row>
            <Col>
            <p>{body}</p>
            </Col>
        </Row>
        <Row>
            <Col><em>--{author}</em></Col>
        </Row>
        <hr />
    </>
  )
}

export default Comment