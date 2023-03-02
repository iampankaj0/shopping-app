import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userAction";
import FormContainer from "../components/shared/FormContainer";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";

const RegisterScreen = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // DE_STRUCTURE DATA
  const { name, email, password, confirmPassword } = userData;

  // ONCHANGE HANDLER
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.userRegister);

  const registerHandler = (e, name, email, password, confirmPassword) => {
    e.preventDefault();
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        dispatch(register(name, email, password));
      } else {
        alert("Password & Confirm password doesn't same.");
      }
    } else {
      alert("Please Fill up all fields very carefully.");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
          {error && <Message variant="danger" alert={error} />}
          <h1 className="my-4">Sign Up/Register</h1>
          <Form
            onSubmit={(e) =>
              registerHandler(e, name, email, password, confirmPassword)
            }
          >
            <Form.Group>
              <Form.Label controlid="name">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                value={name}
                name="name"
                onChange={(e) => handleInputChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label controlid="email">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                name="email"
                onChange={(e) => handleInputChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label controlid="password">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                name="password"
                onChange={(e) => handleInputChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label controlid="confirmpassword">
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={(e) => handleInputChange(e)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              disabled={
                name &&
                email &&
                password &&
                confirmPassword &&
                password === confirmPassword
                  ? false
                  : true
              }
              varient="primary"
              className="d-block mx-auto"
            >
              REGISTER
            </Button>
          </Form>
          <Row>
            <Col>
              Already a user ?<Link to={"/login"}>Login</Link>
            </Col>
          </Row>
        </FormContainer>
      )}
    </>
  );
};

export default RegisterScreen;
