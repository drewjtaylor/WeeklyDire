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
import { useParams } from "react-router-dom";
import { selectUser, updateUser, updatePassword } from "../backendDbOperations";
import { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { Formik, Field, Form } from "formik";
import { UserContext } from "../utils/UserContext";
import Unauthorized from "./Unauthorized";

const EditSelf = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const [cookies] = useCookies();
  const [passwordUpdateModal, setPasswordUpdateModal] = useState(false);
  const [userFromContext] = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await selectUser(userId, cookies.jwt);
        setUser(fetchedUser);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };
    fetchData();
  }, [userId, cookies.jwt]);

  const initialValues = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const handleEditSelfSubmit = async (values) => {
    await updateUser(userId, values, cookies.jwt);
  };

  const togglepasswordUpdateModal = () => {
    setPasswordUpdateModal(!passwordUpdateModal);
  };

  const handleUpdatePasswordSubmit = async (values) => {
    await updatePassword(
      userId,
      values.oldpassword,
      values.newpassword,
      cookies.jwt
    );
  };

  if (userFromContext.admin) {
    return (
      <p className="text-center">
        You appear to have admin privelages. Please make changes on the admin
        page.
      </p>
    );
  }

  if (true) {
    return isLoading ? (
      <Loading />
    ) : (
      <Container>
        <h5>Edit your information below and hit submit.</h5>
        <p>Fill out new values below:</p>
        <Formik initialValues={initialValues} onSubmit={handleEditSelfSubmit}>
          <Form>
            <Row>
              <Col xs="3">
                <Label htmlFor="username" className="me-2">
                  Username:
                </Label>
              </Col>
              <Col xs="9">
                <p>{user.username}</p>
              </Col>
            </Row>
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
              <Col>
                <p>
                  You are currently {user.creator ? null : "not "}a designated
                  creator.
                </p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Button color="danger" onClick={togglepasswordUpdateModal}>
                  Update password?
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
      </Container>
    );
  }

  return <Unauthorized />;
};

export default EditSelf;
