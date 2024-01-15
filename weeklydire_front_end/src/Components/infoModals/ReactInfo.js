import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ReactInfo = ({modalStatus, modalToggle, toggleNextModal}) => {
    return (
      <Modal isOpen={modalStatus} toggle={modalToggle}>
  
          <ModalHeader toggle={modalToggle}>
            React.js
          </ModalHeader>
  
          <ModalBody>
            <p>React.js (or just React) is what you're looking at right now!</p>

            <p>React was used to create the front end of this website. Other 
                libraries include Bootstrap for styling, 
                React-Router for navigation.</p>

            <p>The options at the top of the page will change depending on what type
                of account is logged in. Admins see the "admin" button, "creators" get
                the "write" button where they can create articles, and all users will see
                a button that leads to a page where they can edit their own information.
            </p>

            <p>Additionally, when a user signs in successfully a "jwt" is provided in 
                an http response. The front end stores this jwt in a cookie, 
                and provides it back to the server for any requests that require a user 
                to be logged in, or to check if that account is designated as a "creator" 
                who can write articles, or an "admin" who can perform activities like 
                editing or deleting users, or deleting articles.</p>

            <p>This was just a quick overview. 
                To see what other features are implemented, 
                please check out <a href="https://github.com/drewjtaylor/WeeklyDire" target="_blank" rel="noreferrer">the 
                full readme</a> on github.</p>

                <p>As a reward for clicking through this guide, try logging in as username: "<strong>silver</strong>" and password: "<strong>lining</strong>" to see the site as a "creator". You can even try creating an article if you want!</p>
          </ModalBody>

          <ModalFooter>
            {/* If other modals are added, uncomment and update the button below */}
          {/* <Button color="primary" onClick={() => {modalToggle(); toggleNextModal(true)}}>
            Open next Modal
            </Button>{' '} */}
            <Button color="secondary" onClick={modalToggle}>
              Exit this guide
            </Button>
          </ModalFooter>
  
      </Modal>
    )
  }

export default ReactInfo