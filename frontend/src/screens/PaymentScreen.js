import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartAction";
import CheckOutSteps from "../components/shared/CheckOutSteps";
import FormContainer from "../components/shared/FormContainer";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  console.log(paymentMethod);

  const dispatch = useDispatch();
  const history = useHistory();

  const { shippingAddress } = useSelector((state) => state.cart);

  if (!shippingAddress?.houseNo) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <>
      <CheckOutSteps step1 step2 step3 />
      <h1 className="text-center my-4">Payment Method</h1>
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Payment Method</Form.Label>
            <Col>
              <Form.Check
                className="my-3"
                type="radio"
                label="Paypal or Credit Card"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                className="my-3"
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                className="my-3"
                type="radio"
                label="Cash On Delivery"
                id="COD"
                name="paymentMethod"
                value="COD"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button variant="dark" type="submit" className="d-block my-4 mx-auto">
            Submit
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
