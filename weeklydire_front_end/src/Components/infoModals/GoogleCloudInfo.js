import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const GoogleCloudInfo = ({modalStatus, modalToggle, toggleNextModal}) => {
  return (
    <Modal isOpen={modalStatus} toggle={modalToggle}>

        <ModalHeader toggle={modalToggle}>
            GCLoud modal
        </ModalHeader>

        <ModalBody>

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

export default GoogleCloudInfo