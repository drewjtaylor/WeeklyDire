import {Modal, ModalHeader, ModalBody} from 'reactstrap';

const MessageModal = (headerMessage, bodyMessage, variableToOpen, functionToClose) => {
    return (
        <Modal isOpen={variableToOpen} toggle={functionToClose}>
            <ModalHeader toggle={functionToClose}>{headerMessage}</ModalHeader>
            <ModalBody>{bodyMessage}</ModalBody>
        </Modal>
  )
}

export default MessageModal