import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { updateUser } from "../actions/userAction";
import FormContainer from "../components/shared/FormContainer";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";

const UpdatePasswordScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = data;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error } = useSelector((state) => state.userUpdate);

  const handleUpdatePassword = (e, password, confirmPassword) => {
    e.preventDefault();
    if (password === confirmPassword && userInfo._id) {
      dispatch(updateUser(userInfo?.name, userInfo?.email, password));
      history.push("/profile");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
          {error && <Message variant="danger" alert={error} />}
          <h1 className="my-4 text-center">UPDATE PASSWORD</h1>
          <Form
            onSubmit={(e) => handleUpdatePassword(e, password, confirmPassword)}
          >
            <Form.Group>
              <Form.Label controlid="password">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                value={password}
                name="password"
                onChange={(e) => handleInputChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label controlid="confirmPassword">
                Re-Enter New Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-Enter New Password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={(e) => handleInputChange(e)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="success" className="d-block mx-auto">
              UPDATE
            </Button>

            <Link
              to="/updateprofile"
              className="my-4 d-block mx-auto btn btn-primary"
            >
              UPDATE PROFILE
            </Link>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default UpdatePasswordScreen;
