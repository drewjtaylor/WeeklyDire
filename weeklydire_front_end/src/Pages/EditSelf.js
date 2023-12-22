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
import { selectUser, updateUser, updatePassword } from "../backendDbOperations";
import { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { Formik, Field, Form } from "formik";
import { UserContext } from "../utils/UserContext";
import NotFound from "./NotFound";

const EditSelf = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const [cookies] = useCookies();
  const [passwordUpdateModal, setPasswordUpdateModal] = useState(false);
  const [userFromContext] = useContext(UserContext);

    const navigate = useNavigate();

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
    navigate(-1)
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
        Your account has admin privelages. Please make changes on the admin page.
      </p>
    );
  }

  console.log('user')
  console.log(user)


//   If no user is logged in, return not found
 if (userFromContext.username === undefined) {
    return <div className="text-center">
        <NotFound />
        <p>You are not currently logged in</p>
        <p>If you are trying to edit your user information, please sign in</p>
    </div>
 }

//  If the logged in user does not match the user being edited, return not found
 if (userFromContext.username !== user.username) {
    return <div className="text-center">
        <NotFound />
        <p>This is not the correct address to change your user information.</p>
        <p> Please try logging out and back in, or contact an admin if you continue to have problems.</p>
    </div>
 }


    return isLoading ? (<Loading />) : (
      <Container>
        <h5>Edit your information below and hit submit.</h5>
        <p>Fill out new values below:</p>
        <Formik initialValues={initialValues} onSubmit={handleEditSelfSubmit}>
          <Form>
            <Row className="my-2">
              <Col xs="2" className="">
                <Label htmlFor="username" className="form-label">
                  Username:
                </Label>
              </Col>
              <Col xs="9">
                <p><strong>{user.username}</strong></p>
              </Col>
            </Row>
            <Row className="my-2">
              <Col xs="2" className="">
                <Label htmlFor="email" className="form-label">
                  Email:
                </Label>
              </Col>
              <Col xs="5">
                <Field name="email" className="form-control"/>
              </Col>
            </Row>
            <Row className="my-2">
              <Col xs="2" className="">
                <Label htmlFor="firstName" className="form-label">
                  First Name:
                </Label>
              </Col>
              <Col xs="5">
                <Field name="firstName" className="form-control"/>
              </Col>
            </Row>
            <Row className="my-2">
              <Col xs="2" className="">
                <Label htmlFor="lastName" className="form-label">
                  Last Name:
                </Label>
              </Col>
              <Col xs="5">
                <Field name="lastName" className="form-control"/>
              </Col>
            </Row>

            <Row>
              <Col xs="8" className="text-center">
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
  
};

export default EditSelf;
