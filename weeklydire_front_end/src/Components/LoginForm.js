import {Formik, Field, Form} from 'formik';
import {Label, Button, Col, Row} from 'reactstrap';
import {dbUrl} from "../utils/dbUrl";
import { useCookies } from "react-cookie";

const LoginForm = () => {

    const [cookies, setCookie] = useCookies([]);

    const initialValues = {
        username: '',
        password: '',
    };

    async function postData(url, data) {
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
        setCookie('jwt', JSON.stringify(response), {path: '/'}) // See https://www.tutorialspoint.com/how-to-set-cookies-in-reactjs
        console.log('cookies:')
        console.log(cookies);
        return response.json(); // parses JSON response into native JavaScript objects
      }

    const handleLoginSubmit = async (values) => {
        await postData(dbUrl + '/users/login', values);
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
                  <Field name="password" placeholder="" />
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