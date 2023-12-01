import { useState } from 'react';
import {Button, Modal, ModalHeader, ModalBody, Row, Col} from 'reactstrap';
import {Formik, Field, Form} from 'formik';

const AddComment = () => {
    const [addCommentModal, setAddCommentModal] = useState(false);

    const handleNewCommentSubmit = (values) => {
        console.log(values);
    }

    return (

        <div className='m-3'>
            <Button color='primary' onClick={() => {setAddCommentModal(true)}}>Add comment</Button>
            <Modal isOpen={addCommentModal} toggle={() => setAddCommentModal(false)}>
                <ModalHeader toggle={() => setAddCommentModal(false)}>Modalheader</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{commentBody: ''}}
                        onSubmit={handleNewCommentSubmit}
                    >
                        <Form>
                            <Row className='mb-3'>
                                <Col xs='12'>
                                    <Field 
                                    className='form-control'
                                    as='textarea' 
                                    rows='8' 
                                    name={'commentBody'} 
                                    placeholder='Enter your comment here' />
                                </Col>
                            </Row>
                            <Button type="submit">Submit</Button>
                        </Form>
                    </Formik>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default AddComment