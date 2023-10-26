import {Formik, Field, Form} from 'formik';
import {Label, Button, Container, Col, Row} from 'reactstrap';

const RegisterForm = () => {

    const initialValues = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    };

    const handleRegisterSubmit = (values) => console.log(values)

  return (
<div>
    <Formik
      initialValues={initialValues}
      onSubmit={handleRegisterSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Row>
            <Col xs='3'>
                <Label htmlFor="email" className='me-2'>Email: :</Label>
            </Col>
              <Col xs='9'>
                  <Field name="email" placeholder="" />
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
  </div>
  )
}

export default RegisterForm