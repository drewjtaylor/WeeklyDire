import { Row, Col } from "reactstrap";
import { selectUserPublic } from "../backendDbOperations";
import { useEffect, useState } from "react";

const Comment = ({ comment }) => {
  const {body, authorId, createdAt} = comment;
  const [commentAuthor, setCommentAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

    const readableDate = new Date(createdAt).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAuthor = await selectUserPublic(authorId);
        setCommentAuthor(fetchedAuthor);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error retrieving comment author for ${authorId}`);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [authorId]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Row>
        <Col>
          <p>{body}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="m-0">--Written by: <em>{commentAuthor.username}</em> on {readableDate}</p>
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default Comment;
