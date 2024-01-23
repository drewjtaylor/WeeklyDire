import Loading from "../Components/Loading";
import AddComment from "../Components/AddComment";
import Comment from "../Components/Comment";
import { Container, Row, Col, Button } from "reactstrap";
import {
  selectArticleById,
  selectCommentsByArticle,
} from "../backendDbOperations";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../utils/UserContext";
import logo from "../Assets/WeeklyDireLogoGradient.png";

const FullArticle = () => {
  const [userFromContext] = useContext(UserContext);

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [displayedComments, setDisplayedComments] = useState([])
  const [displayedCommentsPage, setDisplayedCommentsPage] = useState(4)

  // Retrieve article and load author, if possible
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedArticle = await selectArticleById(articleId);
        setArticle(fetchedArticle);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setArticle({})
        console.error("Error fetching your article: ", error);
      }
    };
    fetchData();
  }, [articleId]);

  // Retrieve comments on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedComments = await selectCommentsByArticle(articleId);
        const commentsInReverse = fetchedComments.reverse()
        setComments(commentsInReverse);
        setDisplayedComments(commentsInReverse.slice(0, 4));
      } catch (error) {
        console.error("Error finding the comments for this article: ", error);
      }
    };
    fetchData();
  }, [articleId]);

  // Load more comments
  const handleLoadMoreComments = () => {
    setDisplayedComments(comments.slice(0, displayedCommentsPage+4));
    setDisplayedCommentsPage(displayedCommentsPage+4);
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (article) {
    const { body, title, thumbnail } = article;
    return (
      <Container>
        <Row className="mt-3">
          <Col
            md={{
              offset: 2,
              size: 8,
            }}
          >
            {thumbnail ? (
              <img
                alt={title}
                src={thumbnail}
                className="img-fluid mb-3 rounded-3"
              />
            ) : (
              <img
                alt="Weekly Dire"
                src={logo}
                className="img-fluid mb-3 rounded-3"
              />
            )}
          </Col>
          <Row>
            <Col>
              <h2 className="mb-3 text-center">{title}</h2>
              <p className="m-0 text-center">
                {/* If the author did not have a first or last name, show "Written by user: [username]". Otherwise, show first and last name of author */}
                <em>{`Written by ${article.creator.firstName && article.creator.lastName ? `${article.creator.firstName} ${article.creator.lastName}` : `user: ${article.creator.username}`}`}</em>
              </p>
              <p className="text-center">
                <em>Date: {formattedDate}</em>
              </p>
              <p style={{whiteSpace: "pre-line"}}>{body}</p>
            </Col>
          </Row>
        </Row>
        <Row className="mb-3">
          <Col>
            Tags:{" "}
            {article.tags.length === 0
              ? "There are no tags for this article."
              : article.tags.map((tag, index, fullList) => {
                  return index === fullList.length - 1 ? (
                    <Link
                      to={`/read/tags/${tag}`}
                      key={index}
                    >{`${tag.toUpperCase()}`}</Link>
                  ) : (
                    <>
                        <Link
                          to={`/read/tags/${tag}`}
                          key={index}
                        >
                            {`${tag.toUpperCase()}`}
                        </Link>
                        {", "}
                    </>
                  );
                })}
          </Col>
        </Row>

        <Row>
          <Col>
            {userFromContext.username ? (
              <AddComment
                articleId={articleId}
                comments={comments}
                setComments={setComments}
              />
            ) : (
              <p>Please sign in to leave a comment</p>
            )}
          </Col>
        </Row>
        <Row>
          <h3>Comments:</h3>
        </Row>

        {displayedComments.map((comment, idx) => (
          <Comment key={idx} comment={comment} />
        ))}
        {displayedComments.length >= comments.length ? null : 
            <Button color="primary" onClick={handleLoadMoreComments}>Load more</Button>
        }
      </Container>
    );
  }
};

export default FullArticle;
