import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const AddressModal = ({
  show,
  setShowAddress,
  setAddress,
  address,
  handleOrder,
}) => {
  const handleClose = () => setShowAddress(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deliver To</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group> */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Full Address with pincode</Form.Label>
              <Form.Control
                as="textarea"
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                value={address}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleOrder()}>
            Continue to Buy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddressModal;
