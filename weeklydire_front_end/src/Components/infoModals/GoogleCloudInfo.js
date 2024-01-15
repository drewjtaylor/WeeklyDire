import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import googleCloudScreenshot from '../../Assets/GoogleCloudFunctions.jpg';

const GoogleCloudInfo = ({modalStatus, modalToggle, toggleNextModal}) => {
  return (
    <Modal isOpen={modalStatus} toggle={modalToggle}>

        <ModalHeader toggle={modalToggle}>
            Google Cloud Functions
        </ModalHeader>

        <ModalBody>
            <p>The Express/Node.js server currently lives in Google's cloud services.</p>

            <p>Using Google Cloud Functions, the server is uploaded to Google Cloud, then the MongoDB key was manually stored as an environment variable.</p>

            <p>This screenshot from the logs is an example of a successful login.</p>

            <img src={googleCloudScreenshot} className='img-fluid' alt="logs from google cloud showing successful execution of functions" />

        </ModalBody>

        <ModalFooter>
        <Button color="primary" onClick={() => {modalToggle(); toggleNextModal(true)}}>
          React.js
          </Button>{' '}
          <Button color="secondary" onClick={modalToggle}>
            Exit the guide
          </Button>
        </ModalFooter>

    </Modal>
  )
}

export default GoogleCloudInfo