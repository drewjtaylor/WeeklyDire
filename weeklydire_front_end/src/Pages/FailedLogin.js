import { useState } from 'react';
import {Formik, Field, Form,} from 'formik';
import {Container, Label, Button, Col, Row, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {dbUrl} from "../utils/dbUrl";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

const FailedLogin = () => {

    const [failureModal, setFailureModal] = useState(false);

    const navigate=useNavigate();

    const setCookie = useCookies([])[1];
    const initialValues = {
        username: '',
        password: ''
    }

    const toggleFailureModal = () => {
        setFailureModal(!failureModal)
    }

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
            })
        return completedResponse;
      }

    const handleLoginSubmit = async (values, {resetForm}) => {
        try {
            await postData(dbUrl + '/users/login', values);
            navigate(-1)
        } catch (error) {
            console.log(error);
            setFailureModal(true);
            resetForm();
        }
    }

  return (
    <Container>
        <Row>
            <Col className="text-center">
                <h2>There was an error logging you in</h2>
                <p>Please check your username and password and try again</p>
            </Col>
        </Row>

        <Formik
      initialValues={initialValues}
      onSubmit={handleLoginSubmit}
    >
      {({ isSubmitting }) => (
        <Form>

          <Row className='justify-content-center my-2'>
              <Col xs='3' md='2' xl='2' className='text-end'>
                <Label htmlFor="username" className='form-label'>Username:</Label>
            </Col>
              <Col xs='6' md='4' xl='3'>
                  <Field name="username" placeholder="" className='form-control'/>
              </Col>
          </Row>
          <Row className='justify-content-center my-2'>
              <Col xs='3' md='2' xl='2' className='text-end'>
                <Label htmlFor="password" className='form-label'>Password:</Label>
            </Col>
              <Col xs='6' md='4' xl='3'>
                  <Field type="password" name="password" placeholder="" className='form-control'/>
              </Col>
          </Row>
            <Row className='justify-content-center mt-2'>
                <Col xs='1'>
                    <Button color='primary' type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
      )}
    </Formik>

    <Modal isOpen={failureModal} toggle={toggleFailureModal}>
        <ModalHeader toggle={toggleFailureModal}>Login failed again</ModalHeader>
        <ModalBody>Either your username and password were incorrect, or they don't exist. Please create an account using the "register" button, or contact an administrator if you can't log in to an existing account.</ModalBody>
    </Modal>

    </Container>
  )
}

export default FailedLogin