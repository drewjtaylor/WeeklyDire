import { Row, Col } from "reactstrap";

const Comment = ({ comment }) => {
  const {body, authorId, createdAt} = comment;

    const readableDate = new Date(createdAt).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })

  return (
    <>
      <Row>
        <Col>
          <p>{body}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="m-0">--Written by: <em>{authorId.username}</em> on {readableDate}</p>
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default Comment;
