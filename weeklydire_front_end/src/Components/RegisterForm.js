import {Formik, Field, Form, ErrorMessage} from 'formik';
import {Label, Button, Col, Row} from 'reactstrap';
import { dbUrl } from '../utils/dbUrl';
import { validateRegisterForm } from '../utils/validateRegisterForm';

const RegisterForm = ({closeModal}) => {

    const initialValues = {
        email: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
    };


    async function postData(url = dbUrl + "/users", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }

    const handleRegisterSubmit = async (values) => {
        await postData(dbUrl + '/users', values);
        closeModal();

    }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleRegisterSubmit}
      validate={validateRegisterForm}
    >
      {({ isSubmitting }) => (
        <Form>
          <Row className='d-flex align-items-center'>
            <Col xs='3'>
                <Label htmlFor="email" className='me-2'>Email:</Label>
            </Col>
              <Col xs='9'>
                  <Field name="email" placeholder="" />
                  <ErrorMessage name="email">
                    {(msg) => <p className='text-danger'>{msg}</p>}
                  </ErrorMessage>
              </Col>
          </Row>
          <Row>
            <Col xs='3'>
                <Label htmlFor="username" className='me-2'>Username:</Label>
            </Col>
              <Col xs='9'>
                  <Field name="username" placeholder="Your usernmame will be visible to others." />
                  <ErrorMessage name="username">
                    {(msg) => <p className='text-danger'>{msg}</p>}
                  </ErrorMessage>
              </Col>
          </Row>
          <Row>
            <Col xs='3'>
                <Label htmlFor="firstName" className='me-2'>First Name:</Label>
            </Col>
              <Col xs='9'>
                  <Field name="firstName" placeholder="optional" />
              </Col>
          </Row>
          <Row>
            <Col xs='3'>
                <Label htmlFor="lastName" className='me-2'>Last Name:</Label>
            </Col>
              <Col xs='9'>
                  <Field name="lastName" placeholder="optional" />
              </Col>
          </Row>

          <Row>
              <Col xs='3'>
                <Label htmlFor="password">Password:</Label>
            </Col>
              <Col xs='9'>
                  <Field type="password" name="password" placeholder="" />
                  <ErrorMessage name="password">
                    {(msg) => <p className='text-danger'>{msg}</p>}
                  </ErrorMessage>
              </Col>
          </Row>
          <Row>
              <Col xs='3'>
                <Label htmlFor="passwordAgain">Reenter password:</Label>
            </Col>
              <Col xs='9'>
                  <Field type="password" name="passwordAgain" placeholder="" />
                  <ErrorMessage name="passwordAgain">
                    {(msg) => <p className='text-danger'>{msg}</p>}
                  </ErrorMessage>
              </Col>
          </Row>
            <Row>
                <Col className='text-center'>
                    <Button color='primary' type="submit" disabled={isSubmitting} >
                        Submit
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='m-0'>Password must:</p>
                    <ul>
                        <li>Be at least 6 characters</li>
                        <li>Contain one uppercase letter</li>
                        <li>Contain one lowercase letter</li>
                        <li>Contain one number</li>
                        <li>Contain one these symbols: <strong>@ $ ! % * ? &</strong></li>
                    </ul>
                </Col>
            </Row>
        </Form>
      )}
    </Formik>

  )
}

export default RegisterForm