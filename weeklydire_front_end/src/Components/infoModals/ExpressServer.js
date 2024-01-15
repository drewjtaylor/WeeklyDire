import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ExpressServer = ({modalStatus, modalToggle, toggleNextModal}) => {
    return (
      <Modal isOpen={modalStatus} toggle={modalToggle}>
  
          <ModalHeader toggle={modalToggle}>
            Express/Node.js
          </ModalHeader>
  
          <ModalBody>
            <p>Express/Node.js handles all of the endpoints for the app, manages logic, and uses Mongoose and Passport to interact with the database for users, articles, and comments.</p>

            <p>The front end hits various endpoints off of "/users", "/articles", and "/comments" to perform all database operations and retrieve information.</p>

            <p>Everything from registering a new user to writing an article, to retrieving comments all goes through endpoints on the Express server to interact with the database.</p>

            <p>For example to sign in a user enters their username and password. 
                This information is sent to the Express server, 
                which Passport to check the password against the existing hash/salt 
                in the database. If successful, a 24-hour "jwt" is sent back in the 
                response to be stored by the client.</p>
          </ModalBody>
  
          <ModalFooter>
          <Button color="primary" onClick={() => {modalToggle(); toggleNextModal(true)}}>
            Google Cloud Functions
            </Button>{' '}
            <Button color="secondary" onClick={modalToggle}>
              Exit Guide
            </Button>
          </ModalFooter>
  
      </Modal>
    )
  }

export default ExpressServer