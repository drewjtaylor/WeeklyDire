import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Welcome = ({modalStatus, modalToggle, toggleNextModal}) => {
    return (
      <Modal isOpen={modalStatus} toggle={modalToggle}>
  
          <ModalHeader toggle={modalToggle}>
            Welcome to WeeklyDire!
          </ModalHeader>
  
          <ModalBody>
          <p>WeeklyDire is a demonstration of my abilities to create an APP with the MERN stack, populated with real stories of optimisim and silver linings.</p>
          
          <p>This is made of a MongoDB database, Express/Node.js for the server, and React.js for managing the interface.</p>

          <p>Click the blue "MongoDB" button below to start an overview of these elements, or just click cancel to try using the site.</p>

          <p>You can always click the "How was it made" button at the top to reopen this guide.</p>
          </ModalBody>
  
          <ModalFooter>
            <Button color="primary" onClick={() => {modalToggle(); toggleNextModal(true)}}>
              MongoDB
            </Button>{' '}
            <Button color="secondary" onClick={modalToggle}>
              Close this guide
            </Button>
          </ModalFooter>
  
      </Modal>
    )
  }

export default Welcome