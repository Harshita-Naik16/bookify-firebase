import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../store/firebase";
import CardShimmer from "./CardShimmer";
import { Link } from "react-router-dom";

const BookCard = ({ data, path, btn }) => {
  const [coverImage, setCoverImage] = useState("");
  const { name, price, imageUrl, author } = data;

  const firebase = useFirebase();

  useEffect(() => {
    firebase.getImage(imageUrl).then((url) => setCoverImage(url));
  }, []);

  if (coverImage == "") {
    return <CardShimmer />;
  }

  return (
    <div>
      <Card style={{ width: "18rem", margin: "20px" }}>
        <Card.Img variant="top" src={coverImage} loading="lazy" height={300} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <span>Author:</span> {author}
          </Card.Text>
          <Card.Text>Price: Rs.{price}</Card.Text>
          <Button variant="primary">
            <Link to={path} style={{ color: "white", textDecoration: "none" }}>
              {btn}
            </Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookCard;
