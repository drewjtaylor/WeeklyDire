import {Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import gradientLogo from '../Assets/WeeklyDireLogoGradient.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const Header = () => {

    const [modal, setModal] = useState(false);
    
    const toggleModal = () => {
        setModal(!modal)
    }

  return (
    <Row style={headerStyle} className='sticky-top background-gray mb-3'>
            <Col xs='1'></Col>
            <Col><Link to='/'><img className='img-fluid logo' src={gradientLogo}  /></Link></Col>
            <Col xs='1'><Button onClick={toggleModal}>Sign in or Register</Button></Col>
            <Col xs='1'></Col>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>This will be the sign in area</ModalHeader>
                <ModalBody>
                    ModalBody
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