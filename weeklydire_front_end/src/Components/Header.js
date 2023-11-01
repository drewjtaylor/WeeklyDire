import {Row, Col, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import gradientLogo from '../Assets/WeeklyDireLogoGradient.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LoginForm from './LoginForm';
import Logout from './Logout';
import RegisterForm from './RegisterForm';
import { useContext } from 'react';
import { UserContext } from '../utils/UserContext';


const Header = () => {

    // Establish modal status for login
    const [loginModal, setLoginModal] = useState(false);
    const toggleLoginModal = () => {
        setLoginModal(!loginModal)
    }
    
    // Establish modal status for register
    const [registerModal, setRegisterModal] = useState(false);
    const toggleRegisterModal = () => {
        setRegisterModal(!registerModal)
    }

    // Use context to check if a user is logged in
    const currentUser = useContext(UserContext);

  return (
    <Row style={headerStyle} className='sticky-top background-gray mb-3'>
            <Col xs='1'></Col>
            <Col><Link to='/'><img className='img-fluid logo' src={gradientLogo} alt='weekly dire' /></Link></Col>
            
            
            {currentUser.username ?
                <Col xs='2 mt-2' xl='1'>
                    <p>Welcome, {currentUser.firstName}!</p>
                </Col> :
                <Col xs='1 mt-2'><Button onClick={toggleRegisterModal}>Register</Button></Col>
            }
            {currentUser.username ?
                <Col xs='2 mt-2' xl='1'>
                    <Logout />
                </Col> :
                <Col xs='2 mt-2' xl='1'>
                    <Button color='primary' onClick={toggleLoginModal}>
                        Sign in
                    </Button>
                </Col>
            }
            <Col xs='1'></Col>
            <Modal isOpen={loginModal} toggle={toggleLoginModal}>
                <ModalHeader toggle={toggleLoginModal}>If you have an account, please sign in</ModalHeader>
                <ModalBody>
                    <LoginForm />
                </ModalBody>
            </Modal>
            <Modal isOpen={registerModal} toggle={toggleRegisterModal}>
                <ModalHeader toggle={toggleRegisterModal}>Welcome! Please make an account here.</ModalHeader>
                <ModalBody>
                    <RegisterForm />
                </ModalBody>
            </Modal>
    </Row>
  )
}

const headerStyle = {
    backgroundColor: '#272727',
    color: 'white'
}

export default Header