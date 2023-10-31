import {Formik, Field, Form} from 'formik';
import {Label, Button, Col, Row} from 'reactstrap';

const LoginForm = () => {

    const initialValues = {
        username: '',
        password: '',
    };

    const handleLoginSubmit = (values) => console.log(values)

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