import { Row, Col } from "reactstrap";
import { selectUserPublic } from "../backendDbOperations";
import { useEffect, useState } from "react";

const Comment = ({ body, authorId }) => {
  const [commentAuthor, setCommentAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          <em>--Written by username {`${commentAuthor.username}`}</em>
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default Comment;
