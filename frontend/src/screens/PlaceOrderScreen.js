import React, { Fragment, useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createOrder } from "../actions/orderAction";
import CheckOutSteps from "../components/shared/CheckOutSteps";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cartItem, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );
  console.log(cartItem);

  // DESTUCTURE SHIPPING ADDRESS
  const { houseNo, city, email, pinCode, state, mobile } = shippingAddress;
  console.log(shippingAddress);
  const { order, loading } = useSelector((state) => state.orderCreate);

  console.log(order);

  // TWO ONLY NUMBER DECIMAL
  const addDecimal = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };

  let itemsPrice = 0;
  cartItem.forEach((item) => {
    itemsPrice += item.price * item.qty;
  });

  const shippingPrice = itemsPrice > 500 ? 0 : 70;

  const taxPrice = itemsPrice * 0.18;

  const totalPrice = addDecimal(itemsPrice + shippingPrice + taxPrice);

  // PLACE ORDER HANDLER FUNCTION
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItem,
        shippingAddress,
        paymentMethod,
        itemsPrice: itemsPrice,
        taxPrice: addDecimal(taxPrice),
        shippingPrice: addDecimal(shippingPrice),
        totalPrice: totalPrice,
      })
    );
  };

  useEffect(() => {
    if (order?.success === true) {
      history.push(`/order/${order?.createdOrder?._id}`);
    }
  }, [order?.createdOrder._id, order?.success, history]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CheckOutSteps step1 step2 step3 step4 />
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Address: </strong>
                    {houseNo + ", " + city + ", " + state + ", " + pinCode}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <h5>
                    <strong>{paymentMethod}</strong>
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order items</h2>
                  {cartItem.length === 0 ? (
                    <Message variant="warning" alert="Your cart is empty!" />
                  ) : (
                    <ListGroup variant="flush">
                      {cartItem?.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={2}>
                              <Image src={item.image} alt={item.name} fluid />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} X ${item.price} ={" "}
                              <strong className="text-success">
                                ${item.qty * item.price}
                              </strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {shippingPrice > 0 && (
                      <Row className="text-danger">
                        <Col>Order above $500 to avoid shipping charges.</Col>
                      </Row>
                    )}
                    <Row>
                      <Col>Items</Col>
                      <Col> ${addDecimal(itemsPrice)} </Col>
                    </Row>
                    <Row>
                      <Col>Shipping</Col>
                      <Col> ${shippingPrice} </Col>
                    </Row>
                    <Row>
                      <Col>Tax</Col>
                      <Col> ${addDecimal(taxPrice)} </Col>
                    </Row>
                    <Row>
                      <Col>Total</Col>
                      <Col>
                        ${addDecimal(itemsPrice + shippingPrice + taxPrice)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <Button
                    className="btn-block"
                    disabled={cartItem.length === 0 ? true : false}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Fragment>
  );
};

export default PlaceOrderScreen;
