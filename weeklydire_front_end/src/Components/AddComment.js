import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import { useCookies } from "react-cookie";
import { addComment } from "../backendDbOperations";

const AddComment = ({ articleId, comments, setComments }) => {
  const [addCommentModal, setAddCommentModal] = useState(false);

  const [cookies] = useCookies();

  const handleNewCommentSubmit = async (values) => {
    const response = await addComment(
      articleId,
      values.commentBody,
      cookies.jwt
    );
    setAddCommentModal(false);
    setComments([response, ...comments]);
    return response;
  };

  return (
    <div className="m-3">
      <Button
        color="primary"
        onClick={() => {
          setAddCommentModal(true);
        }}
      >
        Add comment
      </Button>
      <Modal isOpen={addCommentModal} toggle={() => setAddCommentModal(false)}>
        <ModalHeader toggle={() => setAddCommentModal(false)}>
          Modalheader
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{ commentBody: "" }}
            onSubmit={handleNewCommentSubmit}
          >
            <Form>
              <Row className="mb-3">
                <Col xs="12">
                  <Field
                    className="form-control"
                    as="textarea"
                    rows="8"
                    name="commentBody"
                    placeholder="Enter your comment here"
                  />
                </Col>
              </Row>
              <Button type="submit">Submit</Button>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddComment;
