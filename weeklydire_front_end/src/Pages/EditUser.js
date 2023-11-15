import Loading from '../Components/Loading';
import {
    Container, 
    Row, 
    Col,
    Button,
    Label
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import { selectUser, updateUser } from '../sampledbOperations';
import { useEffect, useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import {Formik, Field, Form} from 'formik';
import { UserContext } from "../utils/UserContext";
import Unauthorized from './Unauthorized';


const EditUser = () => {

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {userId} = useParams();
    const [cookies] = useCookies();

    const [userFromContext, setUserFromContext] = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUser = await selectUser(userId, cookies.jwt);
                setUser(fetchedUser);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching your user: ', error)
            }
        }
        fetchData();
    }, [userId, cookies.jwt])

    const handleEditUserSubmit = async (values) => {
        // Radio buttons use strings. Convert to boolean true/false
        if (values.admin === "true") {
            values.admin = true;
        } else {
            values.admin = false;
        };

        if (values.creator === "true") {
            values.creator = true;
        } else {
            values.creator = false
        }

        // console.log(values);
        await updateUser(userId, values, cookies.jwt);
    }

    if (!userFromContext.admin) {
        return <Unauthorized />
    }

    if (userFromContext.admin) {
        return (
            isLoading ? <Loading /> : 
            <Container>
                <h5>Edit information below for username: {user.username}</h5>
                <p>Fill out new values below:</p>
                <Formik
                    initialValues={user}
                    onSubmit={handleEditUserSubmit}
                >
                    <Form>
                        <Row>
                            <Col xs='3'>
                                <Label htmlFor="email" className='me-2'>Email:</Label>
                            </Col>
                            <Col xs='9'>
                                <Field name="email" />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='3'>
                                <Label htmlFor="username" className='me-2'>Username:</Label>
                            </Col>
                            <Col xs='9'>
                                <Field name="username"  />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='3'>
                                <Label htmlFor="firstName" className='me-2'>First Name:</Label>
                            </Col>
                            <Col xs='9'>
                                <Field name="firstName" />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='3'>
                                <Label htmlFor="lastName" className='me-2'>Last Name:</Label>
                            </Col>
                            <Col xs='9'>
                                <Field name="lastName" />
                            </Col>
                        </Row>
    
                        {/* <Row>
                            <Col xs='3'>
                                <Label htmlFor="password">Password:</Label>
                            </Col>
                            <Col xs='9'>
                                <Field name="password" />
                            </Col>
                        </Row> */}
                        <Row>
                            <Col xs='3'>
                                <p>Admin?</p>
                            </Col>
                            <Col>
                                <div role="group">
                                    <span>
                                        <Label className='m-1'>
                                            <Field type="radio" name="admin" value='true' />
                                            Yes
                                        </Label>
                                        <Label className='m-1'>
                                            <Field type="radio" name="admin" value='false' />
                                            No
                                        </Label>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='3'>
                                <p>Creator?</p>
                            </Col>
                            <Col>
                                <div role="group">
                                        <Label className='m-1'>
                                            <Field type="radio" name="creator" value='true' />
                                            Yes 
                                        </Label>
                                        <Label className='m-1'>
                                            <Field type="radio" name="creator" value='false' />
                                            No
                                        </Label>
                                </div>
                            </Col>
                        </Row>
                        <Button color='primary' type="submit">
                            Submit
                        </Button>
                    </Form>
                </Formik>
            </Container>
        )
    }


}

export default EditUser