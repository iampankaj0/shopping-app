import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartAction";
import CheckOutSteps from "../components/shared/CheckOutSteps";
import FormContainer from "../components/shared/FormContainer";
import Message from "../components/shared/Message";

const CheckoutScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { shippingAddress } = useSelector((state) => state.cart);

  const [data, setData] = useState({
    mobile: shippingAddress?.mobile ?? "",
    email: shippingAddress?.email ?? "",
    houseNo: shippingAddress?.houseNo ?? "",
    state: shippingAddress?.state ?? "",
    city: shippingAddress?.city ?? "",
    pinCode: shippingAddress?.pinCode ?? "",
  });

  const [error, setError] = useState("");

  const { mobile, email, houseNo, state, city, pinCode } = data;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSaveAddress = (e, data) => {
    e.preventDefault();

    if (mobile && email && houseNo && state && city && pinCode) {
      dispatch(saveShippingAddress(data));
      history.push("/payment")
    } else {
      setError("Please fill carefully. All fields are mandatory!");
    }
  };

  // saveShippingAddress
  return (
    <>
      <FormContainer>
        <CheckOutSteps step1 step2 />
        <h1 className="my-4 text-center">Shipping Address</h1>
        {error && <Message variant="danger" alert={error} />}
        <Form onSubmit={(e) => handleSaveAddress(e, data)}>
          <Form.Group>
            <Form.Label controlid="mobile">Mobile Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Mobile No."
              value={mobile}
              name="mobile"
              onChange={(e) => handleInputChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label controlid="email">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email Address"
              value={email}
              name="email"
              onChange={(e) => handleInputChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label controlid="houseNo">House Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter House Number"
              value={houseNo}
              name="houseNo"
              onChange={(e) => handleInputChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label controlid="state">State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter State"
              value={state}
              name="state"
              onChange={(e) => handleInputChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label controlid="pinCode">Pin Code</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Pin Code"
              value={pinCode}
              name="pinCode"
              onChange={(e) => handleInputChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label controlid="city">city</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={city}
              name="city"
              onChange={(e) => handleInputChange(e)}
            ></Form.Control>
          </Form.Group>

          {/*  mobile, email, houseNo, state, city, pinCode */}

          <Button
            type="submit"
            varient="primary"
            className="my-4 d-block mx-auto"
          >
            SAVE
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CheckoutScreen;
