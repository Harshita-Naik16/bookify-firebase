import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ErrorComponent = () => {
  return (
    <div className="container mx-auto text-center mt-5">
      <h1>Oops!</h1>
      <h2 className="my-3">Looks like you lost the path!</h2>
      <Button style={{ textTransform: "uppercase" }}>
        <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
          Go to homepage
        </Link>
      </Button>
    </div>
  );
};

export default ErrorComponent;
