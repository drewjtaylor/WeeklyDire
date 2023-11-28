import {Formik, Field, Form} from 'formik';
import {Label, Button, Col, Row} from 'reactstrap';
import {dbUrl} from "../utils/dbUrl";
import { useCookies } from "react-cookie";

const LoginForm = ({closeModal}) => {

    const setCookie = useCookies([])[1];

    const initialValues = {
        username: '',
        password: '',
    };

    const postData = async (url, data) => {
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
        })
        const completedResponse = await response.json();
        const jwt = completedResponse.token;
        setCookie(
            'jwt', 
            jwt, 
            {
                path: '/',
                maxAge: 86400
            }) // See https://www.tutorialspoint.com/how-to-set-cookies-in-reactjs
        return completedResponse;
      }

    const handleLoginSubmit = async (values) => {
        await postData(dbUrl + '/users/login', values);
        closeModal();
    }

  return (
<div>
    <Formik
      initialValues={initialValues}
      onSubmit={handleLoginSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Row>
              <Col xs='3'>
                <Label htmlFor="username" className='me-2'>Username:</Label>
            </Col>
              <Col xs='9'>
                  <Field name="username" placeholder="" />
              </Col>
          </Row>

          <Row>
              <Col xs='3'>
                <Label htmlFor="password">Password:</Label>
            </Col>
              <Col xs='9'>
                  <Field type="password" name="password" placeholder="" />
              </Col>
          </Row>
            <Button color='primary' type="submit" disabled={isSubmitting}>
                Submit
            </Button>
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default LoginForm