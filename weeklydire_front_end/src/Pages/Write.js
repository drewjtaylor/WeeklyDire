import {Col, Row, Container, Button, Label, FormGroup } from 'reactstrap';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { creators } from '../sampledb';
// import { useRef } from 'react';
import { validateWriteForm } from '../utils/validateWriteForm';

const Write = () => {
    const handleSubmit = (values, { resetForm }) => {
        console.log('form values:', values);
        console.log('in JSON format:', JSON.stringify(values));
        resetForm();
    };





    // const tagsRef = useRef(null);
    // const pendingTags = [];

    const creatorUser = creators[0];
    // const creatorUser = false; // use this line to try out not being logged in as creator
    const {first_name} = creatorUser;


    if (creatorUser) {
        return (
            <Container>
                <Row>
                    <Col>
                        <h5>Welcome, {first_name}!</h5>
                        <p>Enter your article information in the form below, and hit submit</p>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Formik
                            initialValues={{
                                title: '',
                                body: '',
                                thumbnail: '',
                                tags: []
                            }}
                            onSubmit={handleSubmit}
                            validate={validateWriteForm}
                        >
                            <Form>
                                <FormGroup row>
                                    <Label htmlFor='title' md='2'>
                                        Title
                                    </Label>
                                    <Col md='10'>
                                        <Field
                                            name='title'
                                            placeholder='Title of your Article'
                                            className='form-control'
                                        />
                                        <ErrorMessage name='title'>
                                            {(msg) => <p className='text-danger'>{msg}</p>}
                                        </ErrorMessage>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor='body' md='2'>
                                        Body
                                    </Label>
                                    <Col md='10'>
                                        <Field
                                            name='body'
                                            as='textarea'
                                            rows='6'
                                            placeholder='Enter the body of your article here'
                                            className='form-control'
                                        />
                                        <ErrorMessage name='body'>
                                            {(msg) => <p className='text-danger'>{msg}</p>}
                                        </ErrorMessage>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor='thumbnail' md='2'>
                                        Thumbnail
                                    </Label>
                                    <Col md='10'>
                                        <Field
                                            name='thumbnail'
                                            placeholder='Optionally enter a link to the thumbnail for your article'
                                            className='form-control'
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{ size: 10, offset: 2 }}>
                                        <Button type='submit' color='primary'>
                                            Submit
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Formik>
                    </Col>
                </Row>
            </Container>
        );
    };

    return (
        <Container>
            <Row>
                <Col>
                    You are not logged in as a contributor.
                </Col>
            </Row>
        </Container>
    )
}
    

export default Write