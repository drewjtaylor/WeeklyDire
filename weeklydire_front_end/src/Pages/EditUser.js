import Loading from "../Components/Loading";
import {
  Container,
  Row,
  Col,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  selectUser,
  updateUser,
  updatePassword,
  resetPassword,
} from "../backendDbOperations";
import { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { Formik, Field, Form } from "formik";
import { UserContext } from "../utils/UserContext";
import Unauthorized from "./Unauthorized";
import NotFound from './NotFound';

const EditUser = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const [cookies] = useCookies();
  const [passwordUpdateModal, setPasswordUpdateModal] = useState(false);
  const [passwordResetModal, setPasswordResetModal] = useState(false);

  const [userFromContext] = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await selectUser(userId, cookies.jwt);
        setUser(fetchedUser);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching your user: ", error);
      }
    };
    fetchData();
  }, [userId, cookies.jwt]);

  // If there is no user, an error could occur when a typo was in the address bar at "/admin/users/[userid]"
  // Set the initial value of the email to something arbitrary to trigger the "Not Found" page later
  const initialValues = user ? {
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    admin: String(user.admin),
    creator: String(user.creator),
  } : {
    email: "none",
  };

  const handleEditUserSubmit = async (values) => {
    // Radio buttons use strings. Convert to boolean true/false
    if (values.admin === "true") {
      values.admin = true;
    } else {
      values.admin = false;
    }

    if (values.creator === "true") {
      values.creator = true;
    } else {
      values.creator = false;
    }

    // Send new user info to update, including boolean admin/creator
    await updateUser(userId, values, cookies.jwt);

    // Navigate back to admin page
    navigate("/admin");
  };

  const togglepasswordUpdateModal = () => {
    setPasswordUpdateModal(!passwordUpdateModal);
  };

  const togglepasswordResetModal = () => {
    setPasswordResetModal(!passwordResetModal);
  };

  const handleUpdatePasswordSubmit = async (values) => {
    await updatePassword(
      userId,
      values.oldpassword,
      values.newpassword,
      cookies.jwt
    );
  };

  const handleResetPasswordSubmit = async (values) => {
    await resetPassword(userId, values.password, cookies.jwt);
  };

  if (isLoading) {return <Loading />};

    // If the user is not an admin, show "Unauthorized" page
    if (!userFromContext.admin) {
        return <Unauthorized />;
    }

    // If there is no user found, show 404: not found
    if (initialValues.email === 'none') {
        return <NotFound />
    }

  if (userFromContext.admin) {
    return (
      <Container>
        <h5>Edit information below for username: {user.username}</h5>
        <p>Fill out new values below:</p>
        <Formik initialValues={initialValues} onSubmit={handleEditUserSubmit}>
          <Form>
            <Row>
              <Col xs="3">
                <Label htmlFor="email" className="me-2">
                  Email:
                </Label>
              </Col>
              <Col xs="9">
                <Field name="email" />
              </Col>
            </Row>
            <Row>
              <Col xs="3">
                <Label htmlFor="username" className="me-2">
                  Username:
                </Label>
              </Col>
              <Col xs="9">
                <Field name="username" />
              </Col>
            </Row>
            <Row>
              <Col xs="3">
                <Label htmlFor="firstName" className="me-2">
                  First Name:
                </Label>
              </Col>
              <Col xs="9">
                <Field name="firstName" />
              </Col>
            </Row>
            <Row>
              <Col xs="3">
                <Label htmlFor="lastName" className="me-2">
                  Last Name:
                </Label>
              </Col>
              <Col xs="9">
                <Field name="lastName" />
              </Col>
            </Row>
            <Row>
              <Col xs="3">
                <p>Admin?</p>
              </Col>
              <Col>
                <div role="group">
            {/* If the user is editing their own details, do not show "admin", so they can't take away their own admin status on accident */}
                    {user.username === userFromContext.username ? 
                        <p>You can't change your own admin status</p> : 
                        <span>
                            <Label className="m-1">
                            <Field type="radio" name="admin" value="true" />
                            Yes
                            </Label>
                            <Label className="m-1">
                            <Field type="radio" name="admin" value="false" />
                            No
                            </Label>
                        </span>
                    }
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="3">
                <p>Creator?</p>
              </Col>
              <Col>
                <div role="group">
                  <Label className="m-1">
                    <Field type="radio" name="creator" value="true" />
                    Yes
                  </Label>
                  <Label className="m-1">
                    <Field type="radio" name="creator" value="false" />
                    No
                  </Label>
                </div>
              </Col>
            </Row>

            {/* <Row className='mb-3'>
                            <Col>
                                <Button color='danger' onClick={togglepasswordUpdateModal}>
                                    Update password?
                                </Button>
                            </Col>
                        </Row> */}

            <Row className="mb-3">
              <Col>
                <Button color="danger" onClick={togglepasswordResetModal}>
                  Reset password
                </Button>
              </Col>
            </Row>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Formik>

        <Modal isOpen={passwordUpdateModal} toggle={togglepasswordUpdateModal}>
          <ModalHeader toggle={togglepasswordUpdateModal}>
            Enter the old password and new password below, then hit submit.
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                oldpassword: "",
                newpassword: "",
              }}
              onSubmit={handleUpdatePasswordSubmit}
            >
              <Form>
                <Row>
                  <Col xs="3">
                    <Label htmlFor="oldpassword" className="me-2">
                      Old Password:
                    </Label>
                  </Col>
                  <Col>
                    <Field type="password" name="oldpassword" />
                  </Col>
                </Row>
                <Row>
                  <Col xs="3">
                    <Label htmlFor="newpassword" className="me-2">
                      New Password:
                    </Label>
                  </Col>
                  <Col>
                    <Field type="password" name="newpassword" />
                  </Col>
                </Row>
                <Button type="submit" color="danger">
                  Submit
                </Button>
              </Form>
            </Formik>
          </ModalBody>
        </Modal>
        <Modal isOpen={passwordResetModal} toggle={togglepasswordResetModal}>
          <ModalHeader toggle={togglepasswordResetModal}>
            Enter the old password and new password below, then hit submit.
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                password: "",
              }}
              onSubmit={handleResetPasswordSubmit}
            >
              <Form>
                <Row>
                  <Col xs="3">
                    <Label htmlFor="password" className="me-2">
                      New Password:
                    </Label>
                  </Col>
                  <Col>
                    <Field type="password" name="password" />
                  </Col>
                </Row>
                <Button type="submit" color="danger">
                  Submit
                </Button>
              </Form>
            </Formik>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
};

export default EditUser;
