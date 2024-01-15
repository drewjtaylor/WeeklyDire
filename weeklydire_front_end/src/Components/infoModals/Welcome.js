import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Welcome = ({modalStatus, modalToggle, toggleNextModal}) => {
    return (
      <Modal isOpen={modalStatus} toggle={modalToggle}>
  
          <ModalHeader toggle={modalToggle}>
            Welcome Modal
          </ModalHeader>
  
          <ModalBody>
          This should show a brief description and ask if the user wants to see how the site is built, or just wants to use it
          </ModalBody>
  
          <ModalFooter>
            <Button color="primary" onClick={() => {modalToggle(); toggleNextModal(true)}}>
              Open next Modal
            </Button>{' '}
            <Button color="secondary" onClick={modalToggle}>
              Cancel
            </Button>
          </ModalFooter>
  
      </Modal>
    )
  }

export default Welcome