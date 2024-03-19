import { useEffect, useState, useContext } from "react";
import {
  selectAllDbArticles,
  selectDeletedDbArticles,
  selectAllUsers,
  softDeleteArticleById,
  restoreArticleById,
  deleteArticleById,
} from "../backendDbOperations";
import { useCookies } from "react-cookie";
import { Container, Row, Table, Button } from "reactstrap";
import Loading from "../Components/Loading";
import Unauthorized from "../Pages/Unauthorized";
import { Link } from "react-router-dom";
import { UserContext } from "../utils/UserContext";

const Admin = () => {
  const setErrorMessage = useState("")[1];
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [deletedArticles, setDeletedArticles] = useState([]);
  const [deletedArticlesLoading, setDeletedArticlesLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [cookies] = useCookies();
  const [userFromContext] = useContext(UserContext);
  const [adminChoice, setAdminChoice] = useState("users");
  const [isLoading, setIsLoading] = useState(true);

  // Function to find the username from a creator._id
  const findCreatorUsername = (creatorId) => {
    const user = users.find((user) => user._id === creatorId);
    return user ? user.username : "Unknown";
  };

  // On page load, get users and articles
  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const fetchedArticles = await selectAllDbArticles();
        setArticles(fetchedArticles);
        setArticlesLoading(false);
      } catch (error) {
        setArticlesLoading(false);
        setErrorMessage(error.message);
        console.error("Error fetching articles: ", error);
      }
    };
    const fetchDeletedArticles = async () => {
        try {
            const fetchedDeletedArticles = await selectDeletedDbArticles();
            setDeletedArticles(fetchedDeletedArticles);
            setDeletedArticlesLoading(false);
        } catch (error) {
            setDeletedArticlesLoading(false);
            setErrorMessage(error.message);
            console.error("Error fetching deleted articles: ", error)
        }
    }
    const fetchUsersData = async () => {
      try {
        const fetchedUsers = await selectAllUsers(cookies.jwt);
        setUsers(fetchedUsers);
        setUsersLoading(false);
      } catch (error) {
        setUsersLoading(false);
        setErrorMessage(error.message);
        console.error("Error fetching users: ", error);
      }
    };

    fetchArticleData();
    fetchDeletedArticles();
    fetchUsersData();
  }, [cookies.jwt, setErrorMessage]);

  const usersTable = (
    <>
      <Row>
        <h1>Users</h1>
      </Row>
      {usersLoading ? (
        <Loading />
      ) : (
        <Table bordered>
          <thead>
            <tr>
              <th>Username (click to edit)</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Creator?</th>
              <th>Admin?</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>
                  <Link to={`/admin/users/${user._id}`}>{user.username}</Link>
                </td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.creator ? "Yes" : "No"}</td>
                <td>{user.admin ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );

  const articlesTable = (
    <>
      <Row id="articles">
        <h1>Articles</h1>
      </Row>
      {articlesLoading ? (
        <Loading />
      ) : (
        <Table bordered>
          <thead>
            <tr>
              <th>Title:</th>
              <th>Creator:</th>
              <th>Tags:</th>
              <th>Action:</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, idx) => (
              <tr key={idx}>
                <td>{article.title}</td>
                <td>{findCreatorUsername(article.creator)}</td>
                <td>
                  {article.tags.length === 0
                    ? "None"
                    : article.tags.map((tag, index, fullList) => {
                        return index === fullList.length - 1 ? (
                          <div
                            className="m-0 p-0"
                            key={index}
                          >{`${tag.toUpperCase()}`}</div>
                        ) : (
                          <div
                            className="m-0 p-0"
                            key={index}
                          >{`${tag.toUpperCase()}, `}</div>
                        );
                      })}
                </td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => {
                      softDeleteArticleById(article._id, cookies.jwt);
                      setArticles(
                        articles.filter((each) => article._id !== each._id)
                      );
                      // Need to update deletedArticles to include soft-deleted article
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );

  const deletedUsersTable = (<>
  </>)

  const deletedArticlesTable = (
    <>
      <Row id="articles">
        <h1>Deleted Articles</h1>
      </Row>
      <Row>
        <p>These articles are currently marked as "deleted" but recoverable</p>
        <p>They will not show up on the main page or any searches.</p>
        <p>To restore a deleted article, click "restore."</p>
      </Row>
      {deletedArticlesLoading ? (
        <Loading />
      ) : (
        <Table bordered>
          <thead>
            <tr>
              <th>Title:</th>
              <th>Creator:</th>
              <th>Tags:</th>
              <th>Action:</th>
            </tr>
          </thead>
          <tbody>
            {deletedArticles.map((article, idx) => (
              <tr key={idx}>
                <td>{article.title}</td>
                <td>{findCreatorUsername(article.creator)}</td>
                <td>
                  {article.tags.length === 0
                    ? "None"
                    : article.tags.map((tag, index, fullList) => {
                        return index === fullList.length - 1 ? (
                          <div
                            className="m-0 p-0"
                            key={index}
                          >{`${tag.toUpperCase()}`}</div>
                        ) : (
                          <div
                            className="m-0 p-0"
                            key={index}
                          >{`${tag.toUpperCase()}, `}</div>
                        );
                      })}
                </td>
                <td>
                  <Button
                    color="success"
                    onClick={() => {
                      restoreArticleById(article._id, cookies.jwt);
                      setDeletedArticles(
                        deletedArticles.filter((each) => article._id !== each._id)
                      )
                      // Need to set articles to include restored article
                    }}
                  >
                    Restore
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )

  // Give the app time to check if the existing user is an admin
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);
  if (isLoading) {
    return <Loading />;
  }

  // If the current user is not an admin, display "Unauthorized"
  if (!userFromContext.admin) {
    return (
      <Container>
        <Unauthorized />
      </Container>
    );
  }

  // Double check the userfrom context is an admin, and display the page
  if (userFromContext.admin) {
    return (
      <Container>
        <h5>
          Welcome to the admin page. Do you want to edit Users or Articles?
        </h5>
        <span>
          <Button
            className="m-2"
            color={adminChoice === "users" ? "primary" : "secondary"}
            onClick={() => {
              setAdminChoice("users");
            }}
          >
            Users
          </Button>
          <Button
            className="m-2"
            color={adminChoice === "articles" ? "primary" : "secondary"}
            onClick={() => {
              setAdminChoice("articles");
            }}
          >
            Articles
          </Button>
          <Button
            className="m-2"
            color={adminChoice === "deletedArticles" ? "primary" : "secondary"}
            onClick={() => {
              setAdminChoice("deletedArticles");
            }}
          >
            Deleted Articles
          </Button>
        </span>
        {adminChoice === "users" ? (
          usersTable
        ) : adminChoice === "articles" ? (
          articlesTable
        ) : adminChoice === "deletedArticles" ? (
            deletedArticlesTable
        ) : (
          <p>Please select a table to view.</p>
        )}
      </Container>
    );
  }
};

export default Admin;
