import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../store/firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AddressModal from "../components/AddressModal";

const DetailsPage = () => {
  const [data, setData] = useState({});
  const [url, setUrl] = useState("");
  const [qty, setQty] = useState(1);
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddress = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowAddress(true);
  };

  const params = useParams();
  const navigate = useNavigate();

  const firebase = useFirebase();
  const user = firebase.userState;

  useEffect(() => {
    firebase
      .getBookById(params.bookId)
      .then((docSnap) => setData(docSnap.data()));
  }, []);

  useEffect(() => {
    if (data.hasOwnProperty("imageUrl")) {
      firebase.getImage(data.imageUrl).then((imageUrl) => setUrl(imageUrl));
    }
  }, [data]);

  const handleOrder = async () => {
    try {
      const result = await firebase.placeOrder(params.bookId, qty, address);
      console.log(result.id);
      const setUserOrderDetails = await firebase.setUserOrder(
        params.bookId,
        data.name,
        data.displayName,
        data.price,
        qty,
        address,
        result.id
      );
      handleShow();
    } catch (error) {
      alert("Sorry Order could not be placed Try Again");
      console.log(error);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "650px" }}>
      <AddressModal
        show={showAddress}
        setShowAddress={setShowAddress}
        setAddress={setAddress}
        address={address}
        handleOrder={handleOrder}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, Order Placed!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <h1 className="text-muted fw-light">{data && data.name}</h1>
      <img src={url} className=" m-5" height={300} width={250} />
      <p>Price: Rs.{data.price}</p>
      <p>Author: {data.author}</p>
      <p>Sold By: {data.displayName}</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Quantity:</Form.Label>
        <Form.Control
          type="number"
          onChange={(e) => setQty(e.target.value)}
          value={qty}
        />
        <Button onClick={() => handleAddress()} className="mt-3">
          Buy Now
        </Button>
      </Form.Group>
    </div>
  );
};

export default DetailsPage;
