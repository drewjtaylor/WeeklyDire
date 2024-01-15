import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MongoDBUser from "../../Assets/MongoDBUser.jpg";

const MongoDBInfo = ({modalStatus, modalToggle, toggleNextModal}) => {
    return (
      <Modal isOpen={modalStatus} toggle={modalToggle}>
  
          <ModalHeader toggle={modalToggle}>
            MongoDB/Atlas
          </ModalHeader>
  
          <ModalBody>
            <p>This app uses MongoDB as a database. The data is stored and accessed through Atlas, MongoDB's cloud solution.</p>

            <p>A secret key is stored in the Express/Node server allowing all route calls triggering database functions to use my Atlas account.</p>

            <p>MongoDB stores information in a style similar to JSON objects. For example, this is a user:</p>

            <img src={MongoDBUser} className='img-fluid' alt='A mongoDB document' />
            <br />
            <p>Note the password is saved with a hash/salt for security.</p>
          </ModalBody>
  
          <ModalFooter>
          <Button color="primary" onClick={() => {modalToggle(); toggleNextModal(true)}}>
            Express/Node.js
            </Button>{' '}
            <Button color="secondary" onClick={modalToggle}>
              Exit guide
            </Button>
          </ModalFooter>
  
      </Modal>
    )
  }

export default MongoDBInfo