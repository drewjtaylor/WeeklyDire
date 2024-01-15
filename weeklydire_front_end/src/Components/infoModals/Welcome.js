import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Welcome = ({modalStatus, modalToggle, toggleNextModal}) => {
    return (
      <Modal isOpen={modalStatus} toggle={modalToggle}>
  
          <ModalHeader toggle={modalToggle}>
            Welcome!
          </ModalHeader>
  
          <ModalBody>
          <p>This is made of a MongoDB database, Express/Node.js for the server, and React.js for managing the interface.</p>

          <p>Click below to see more details on these elements, or just click cancel to try using the site.</p>

          <p>You can always click the "How was it made" button at the top to reopen this guide.</p>
          </ModalBody>
  
          <ModalFooter>
            <Button color="primary" onClick={() => {modalToggle(); toggleNextModal(true)}}>
              See how MongoDB is used
            </Button>{' '}
            <Button color="secondary" onClick={modalToggle}>
              Close this guide
            </Button>
          </ModalFooter>
  
      </Modal>
    )
  }

export default Welcome