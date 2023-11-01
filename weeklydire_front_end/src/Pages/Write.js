    import {Col, Row, Container, Button, Label, FormGroup } from 'reactstrap';
    import {Formik, Form, Field, ErrorMessage} from 'formik';
    import { creators } from '../sampledb';
    import { validateWriteForm } from '../utils/validateWriteForm';
    import { useState, useRef } from 'react';
    import {dbUrl} from '../utils/dbUrl';
    import { useCookies } from 'react-cookie';


    const Write = () => {
        const ref = useRef(null);
        const [cookies] = useCookies();
        console.log(cookies.jwt)

        const [pendingTags, setPendingTags] = useState([]);

        async function postData(url, data) {
            // Default options are marked with *
            const response = await fetch(url, {
              method: "POST",
              mode: "cors", // no-cors, *cors, same-origin
              cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              credentials: "same-origin", // include, *same-origin, omit
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.jwt}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: "follow", // manual, *follow, error
              referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify(data), // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
          }
    
        const handleArticleSubmit = async (values) => {
            console.log(values);
            await postData(dbUrl + "/articles", values);
        }


        // Currently submits nowhere
        const handleSubmit = (values, { resetForm }) => {
            values.tags = pendingTags; // Gets all of the "pending tags" into values instead of just what's in the "Tags" field at the time
            handleArticleSubmit(values);
            
            // console.log('form values:', values);
            // console.log('in JSON format:', JSON.stringify(values));
            resetForm();
        };

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
                                innerRef={ref}
                            >
                                {({setFieldValue}) =>  ( // setFieldValue used to set "tags" field to empty on each addition
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
                                            <Label htmlFor='tags' md='2'>
                                                Tags
                                            </Label>
                                            <Col md='6'>
                                                <Field
                                                    name='tags'
                                                    placeholder='Enter one tag at a time (i.e., "Hurricane", "Florida")'
                                                    className='form-control'
                                                />
                                            </Col>
                                            <Col md='4'>
                                                <Button type='button' onClick={() => {
                                                        setPendingTags([...pendingTags, ref.current.values.tags])
                                                        setFieldValue('tags', '')
                                                }}>
                                                    Add tag
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                        <Row>
                                            <Col md='2'/>
                                            <Col>
                                                {pendingTags ? pendingTags.map((tag, idx) => (
                                                    <Button className='me-2 mb-2'
                                                        type='button' 
                                                        onClick={() => {
                                                            setPendingTags(
                                                                pendingTags.filter(currentTag => currentTag !== tag)
                                                            )
                                                        }} key={idx}>{tag} X</Button>)) : null }
                                            </Col>
                                        </Row>
                                        <FormGroup row>
                                            <Col md={{ size: 10, offset: 2 }}>
                                                <Button type='submit' color='primary'>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                )}
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
                        Your account is not designated as a creator.
                    </Col>
                </Row>
            </Container>
        )
    }

    export default Write