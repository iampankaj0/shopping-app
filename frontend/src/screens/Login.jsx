import React, { useEffect, useState } from "react";
import { login } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/shared/FormContainer";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const { userInfo, error, loading } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo?._id) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const handleLogin = (e, email, password) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
          {error && <Message variant="danger" alert={error} />}
          <h1 className="my-4">SIGN IN</h1>
          <Form onSubmit={(e) => handleLogin(e, email, password)}>
            <Form.Group>
              <Form.Label controlid="email">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label controlid="password">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              disabled={email && password ? false : true}
              varient="primary"
              className="d-block mx-auto"
            >
              SIGN IN
            </Button>
          </Form>
          <Row>
            <Col>
              New Customer ?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </Col>
          </Row>
        </FormContainer>
      )}
    </>
  );
};

export default Login;
