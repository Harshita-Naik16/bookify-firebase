import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useFirebase } from "../store/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(" .");

  const navigate = useNavigate();

  const firebase = useFirebase();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await firebase.signinUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      console.log(error.message);
      setErrorMsg("Invalid email and password.");
    }
  };

  return (
    <div className="custom-sm-container mx-auto mt-5 ">
      {errorMsg && (
        <Alert variant={"warning"}>
          {errorMsg} New to bookify?{" "}
          <Alert.Link href="/register">Register</Alert.Link>
        </Alert>
      )}
      <h1 className="text-center">Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <p className="m-5">OR</p>
      <Button variant="danger" onClick={firebase.signInWithGoogle}>
        Signin with Google
      </Button>
    </div>
  );
};

export default Login;
