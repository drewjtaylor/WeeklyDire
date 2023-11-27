// This entire component is deprecated, but being saved for reference if need
// Instead, the NavbarHeader component is now being used in its place
// This was done because this component artificially tried to do layout with col/row
// However, this works better with properly formatted "Nav", "Navbar", etc
// Doing a "collapse" feature on this component also would have been more difficult
// Commented out the "export header" line at the end, to make sure the site breaks if this
// is used by mistake anywhere.

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
    const [currentUser] = useContext(UserContext);

  return (
    <Row style={headerStyle} className='sticky-top mb-3'>
            <Col xs='0' sm='1'></Col>
            
            {/* Logo */}
            <Col><Link to='/'><img className='img-fluid logo' src={gradientLogo} alt='weekly dire' /></Link></Col>


            {currentUser.username ?
                <Col xs='2' md='1' className='mt-3'>
                    <p>Welcome, {currentUser.firstName}!</p>
                </Col> :
                <Col xs='1 mt-3'><Button onClick={toggleRegisterModal}>Register</Button></Col>
            }

            {currentUser.username ?
                <Col xs='2' md='1' className='mt-3'>
                    <Logout />
                </Col> :
                <Col xs='2' md='1' className='mt-3'>
                    <Button color='primary' onClick={toggleLoginModal}>
                        Sign in
                    </Button>
                </Col>
            }

            {currentUser.creator ?
                <Col xs='2' md='1' className='mt-3'>
                    <Link to='/write'>
                        <Button as='a' color='success'>Write</Button>
                    </Link>
                </Col> :
                null
            }

            {currentUser.admin ?
                <Col xs='2' md='1' className='mt-3'>
                    <Link to='/admin'>
                        <Button as='a' color='danger'>Admin</Button>
                    </Link>
                </Col> :
                null
            }
            
            <Col xs='1'></Col>
            <Modal isOpen={loginModal} toggle={toggleLoginModal}>
                <ModalHeader toggle={toggleLoginModal}>If you have an account, please sign in</ModalHeader>
                <ModalBody>
                    <LoginForm closeModal={toggleLoginModal}/>
                </ModalBody>
            </Modal>
            <Modal isOpen={registerModal} toggle={toggleRegisterModal}>
                <ModalHeader toggle={toggleRegisterModal}>Welcome! Please make an account here.</ModalHeader>
                <ModalBody>
                    <RegisterForm closeModal={toggleRegisterModal}/>
                </ModalBody>
            </Modal>
    </Row>
  )
}

const headerStyle = {
    backgroundColor: '#272727',
    color: 'white'
}

// export default Header