import {Formik, Field, Form} from 'formik';
import {Label, Button, Col, Row} from 'reactstrap';
import { dbUrl } from '../utils/dbUrl';

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
    >
      {({ isSubmitting }) => (
        <Form>
          <Row>
            <Col xs='3'>
                <Label htmlFor="email" className='me-2'>Email:</Label>
            </Col>
              <Col xs='9'>
                  <Field name="email" placeholder="" />
              </Col>
          </Row>
          <Row>
            <Col xs='3'>
                <Label htmlFor="username" className='me-2'>Username:</Label>
            </Col>
              <Col xs='9'>
                  <Field name="username" placeholder="Your usernmame will be visible to others." />
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
                  <Field name="password" placeholder="" />
              </Col>
          </Row>
            <Button color='primary' type="submit" disabled={isSubmitting}>
                Submit
            </Button>
        </Form>
      )}
    </Formik>

  )
}

export default RegisterForm