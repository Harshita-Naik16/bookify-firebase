import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../store/firebase";

const List = () => {
  const [bookName, setBookName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState({});
  const [author, setAuthorName] = useState("");
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(true);

  const firebase = useFirebase();
  const user = firebase.userState;

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = firebase
      .addBookToList(bookName, isbnNumber, price, coverPic, author)
      .then((res) => {
        setShow(true);
        setSuccess(true);
      })
      .catch((err) => {
        setShow(true);
        setSuccess(false);
      });
  };

  return (
    <div className="custom-sm-container mx-auto mt-5">
      {!user && (
        <Alert variant={"warning"}>
          <Alert.Link href="/login">Login</Alert.Link> to list books
        </Alert>
      )}
      {show && (
        <Alert variant={success ? "success" : "danger"}>
          {success
            ? "Uploaded Successfully"
            : "Something went wrong while uploading"}
        </Alert>
      )}
      <h1 className="text-center h3 m-3">List Books to sell</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            disabled={!user}
            type="text"
            placeholder="Enter book name"
            onChange={(e) => setBookName(e.target.value)}
            value={bookName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Author Name</Form.Label>
          <Form.Control
            disabled={!user}
            type="text"
            placeholder="Enter author name"
            onChange={(e) => setAuthorName(e.target.value)}
            value={author}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN Number</Form.Label>
          <Form.Control
            disabled={!user}
            type="text"
            placeholder="Enter ISBN Number"
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            disabled={!user}
            type="text"
            placeholder="Enter Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Add Image</Form.Label>
          <Form.Control
            disabled={!user}
            type="file"
            onChange={(e) => setCoverPic(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!user}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default List;
