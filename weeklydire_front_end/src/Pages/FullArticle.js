import Loading from "../Components/Loading";
import AddComment from "../Components/AddComment";
import Comment from "../Components/Comment";
import { Container, Row, Col } from "reactstrap";
import {
  selectArticleById,
  selectUserPublic,
  selectCommentsByArticle,
} from "../backendDbOperations";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../utils/UserContext";
import logo from "../Assets/WeeklyDireLogoGradient.png";

const FullArticle = () => {
  const [userFromContext] = useContext(UserContext);

  const [article, setArticle] = useState({});
  const [creator, setCreator] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);

  // Retrieve article and load author, if possible
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedArticle = await selectArticleById(articleId);
        setArticle(fetchedArticle);
        setIsLoading(false);
        try {
          const fetchedCreator = await selectUserPublic(fetchedArticle.creator);
          setCreator(fetchedCreator);
        } catch (error) {
          console.error("Error finding the author for this article: ", error);
        }
      } catch (error) {
        setIsLoading(false);
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
        setComments(fetchedComments.reverse());
      } catch (error) {
        console.error("Error finding the comments for this article: ", error);
      }
    };
    fetchData();
  }, [articleId]);

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
                <em>{`Written by ${creator.firstName} ${creator.lastName}`}</em>
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
                    <Link
                      to={`/read/tags/${tag}`}
                      key={index}
                    >{`${tag.toUpperCase()}, `}</Link>
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

        {comments.map((comment, idx) => (
          <Comment key={idx} body={comment.body} authorId={comment.authorId} createdAt={comment.createdAt}/>
        ))}
      </Container>
    );
  }
};

export default FullArticle;
