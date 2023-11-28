import { useState, useContext } from 'react';
import { UserContext } from '../utils/UserContext';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import gradientLogo from '../Assets/WeeklyDireLogoGradient.png';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Logout from './Logout';

const NavbarHeader = () => {

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

    // Logic/state of collapse-button
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // "navItems" will be used alternativly on small/large screens
    const navItems = <>

        {/* Shows "Sign In" if there's not a current username, or "Logout" if there is */}
        <NavItem>
            {/* Other "Buttons" are links. Even though this isn't a link, wrapped it in a NavLink to fix styling */}
            <NavLink>
                {currentUser.username ?
                    <Logout /> :
                    <Button color='primary' onClick={toggleLoginModal}>
                        Sign in
                    </Button>
                }
            </NavLink>
        </NavItem>

        {/* Conditional Register button shows if no username on current user */}
        {currentUser.username ? null : 
            <NavLink>
                <Button onClick={toggleRegisterModal}>Register</Button>
            </NavLink>
        }

        {/* Conditional link to "Write" if the user has the "creator" property */}
        <NavItem>
            {currentUser.creator ?
                <NavLink href='/write'>
                    <Button color='success'>Write</Button>
                </NavLink> :
                null
            }
        </NavItem>

        {/* Conditional link to "Admin" if the user has the "admin" property */}
        <NavItem>
            {currentUser.admin ?
                <NavLink href='/admin'>
                    <Button color='danger'>Admin</Button>
                </NavLink> :
                null
            }
        </NavItem>
    </>

  return (
      <Navbar style={headerStyle} className='mb-3 navbar-dark'>
            <NavbarBrand href='/'>
                <img className='logo' src={gradientLogo} alt='weekly dire' />
            </NavbarBrand>
        <NavbarText color='white'>{currentUser.firstName ? `Welcome ${currentUser.firstName}` : null}</NavbarText>

            {/* Used regular bootstrap classes to hide/display each type of navbar depending on screen size */}
            {/* On medium screens and smaller, navbar collapses with hamburger button */}
            <NavbarToggler className={hideOnLarge} onClick={toggle} color='light' />
            <Collapse  isOpen={isOpen} navbar>
                <Nav className={hideOnLarge} navbar>
                    {navItems}
                </Nav>
            </Collapse>

            {/* Regular navbar on large screens and higher */}
            <Nav className={`${hideUpToLarge}`}>
                {navItems}
            </Nav>

            {/* Modal for the Login Button */}
            <Modal isOpen={loginModal} toggle={toggleLoginModal}>
                <ModalHeader toggle={toggleLoginModal}>If you have an account, please sign in</ModalHeader>
                <ModalBody>
                    <LoginForm closeModal={toggleLoginModal}/>
                </ModalBody>
            </Modal>

            {/* Modal for the Register Button */}
            <Modal isOpen={registerModal} toggle={toggleRegisterModal}>
                <ModalHeader toggle={toggleRegisterModal}>Welcome! Please make an account here.</ModalHeader>
                <ModalBody>
                    <RegisterForm closeModal={toggleRegisterModal}/>
                </ModalBody>
            </Modal>
      </Navbar>
  );
}

const headerStyle = {
    backgroundColor: '#272727',
    color: 'white'
};

    // Variables to define visibility conditional on screen size
const hideOnLarge = 'd-block d-lg-none';
const hideUpToLarge = 'd-none d-lg-flex'

export default NavbarHeader;