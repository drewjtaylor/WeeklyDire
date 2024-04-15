import {Col, Row, Container, Button, Label, FormGroup } from 'reactstrap';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { validateWriteForm } from '../utils/validateWriteForm';
import { useState, useRef, useContext} from 'react';
import {dbUrl} from '../utils/dbUrl';
import { useCookies } from 'react-cookie';
import Unauthorized from '../Pages/Unauthorized';
import { UserContext } from '../utils/UserContext';
import Loading from '../Components/Loading';


    const Write = ({articleBeingEdited}) => {

        const ref = useRef(null);
        const [cookies] = useCookies();
        const [pendingTags, setPendingTags] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [isEditing, setIsEditing] =useState(false);


        if (articleBeingEdited !== undefined) {
            setIsEditing(true);
        };

        // Check current user
        const [userFromContext] = useContext(UserContext);

        const postData = async (url, data) => {
            // Default options are marked with *

            // If this page is being opened to edit an article, uses PUT instead of POST
            // For editing, the url passed to this function must include the article ID
            // i.e., (`/articles/${articleId}`)
            if (isEditing) {
                const response = await fetch(url, {
                    method: "PUT",
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${cookies.jwt}`
                    },
                    redirect: "follow", // manual, *follow, error
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify(data), // body data type must match "Content-Type" header
                  });
                  return response.json(); // parses JSON response into native JavaScript objects
            } else {
                const response = await fetch(url, {
                    method: "POST",
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${cookies.jwt}`
                    },
                    redirect: "follow", // manual, *follow, error
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify(data), // body data type must match "Content-Type" header
                  });
                  return response.json(); // parses JSON response into native JavaScript objects
            }
          }

        const handleArticleSubmit = async (values) => {
            // If an article is being edited, use specific suffix
            const urlSuffix = isEditing ? "/articles" : `/articles/${articleBeingEdited._id}`;

            await postData(dbUrl + urlSuffix, values);
        }

        const handleSubmit = (values, { resetForm }) => {
            values.tags = pendingTags; // Gets all of the "pending tags" into values instead of just what's in the "Tags" field at the time
            handleArticleSubmit(values);
            resetForm();
        };

        // Give the app time to check if the existing user is a creator
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        if (isLoading) {
            return <Loading />
        }

        if (!userFromContext.creator) {
            return <Container>
                <Unauthorized />
            </Container>
        }

        if (userFromContext.creator) {
            return (
                <Container>
                    <Row>
                        <Col>
                            <h5>Welcome!</h5>
                            <p>Enter your article information in the form below, and hit submit</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Formik
                            // If the article is being edited, fill initial values
                                initialValues={ isEditing ? {
                                    title: articleBeingEdited.title,
                                    body: articleBeingEdited.body,
                                    thumbnail: articleBeingEdited.thumbnail,
                                    tags: articleBeingEdited.tags
                                } : {
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
                                                    rows='12'
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
        }

    }

    export default Write