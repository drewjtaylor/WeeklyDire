import {Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import gradientLogo from '../Assets/WeeklyDireLogoGradient.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


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

  return (
    <Row style={headerStyle} className='sticky-top background-gray mb-3'>
            <Col xs='1'></Col>
            <Col><Link to='/'><img className='img-fluid logo' src={gradientLogo}  /></Link></Col>
            <Col xs='1 mt-2'><Button onClick={toggleLoginModal}>Sign in</Button></Col>
            <Col xs='1 mt-2'><Button onClick={toggleRegisterModal}>Register</Button></Col>
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