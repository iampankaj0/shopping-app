import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { updateUser } from "../actions/userAction";
import FormContainer from "../components/shared/FormContainer";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";

const UpdateProfileScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const [data, setData] = useState({
    name: userInfo?.name,
    email: userInfo?.email,
  });

  const { name, email } = data;

  const { loading, error } = useSelector((state) => state.userUpdate);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUpdateUser = (e, name, email) => {
    e.preventDefault();
    dispatch(updateUser(name, email));
    history.push("/profile");
    window.location.reload(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
          {error && <Message variant="danger" alert={error} />}
          <h1 className="my-4 text-center">UPDATE PROFILE</h1>
          <Form onSubmit={(e) => handleUpdateUser(e, name, email)}>
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

            <Button type="submit" variant="success" className="d-block mx-auto">
              UPDATE
            </Button>

            <Link
              to="/updatepassword"
              className="my-4 d-block mx-auto btn btn-primary"
            >
              UPDATE PASSWORD
            </Link>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default UpdateProfileScreen;
