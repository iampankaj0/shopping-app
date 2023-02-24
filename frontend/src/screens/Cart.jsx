import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  ListGroup,
} from "react-bootstrap";

import { removeToCart } from "../actions/cartAction";
import { Link } from "react-router-dom";
import Message from "../components/shared/Message";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.cart);

  let SubTotal = 0;
  cartItem.forEach((item) => {
    SubTotal += item.price * item.qty;
  });
  console.log(SubTotal);

  return (
    <Fragment>
      {cartItem.length <= 0 ? (
        <div className="mt-5">
          <Message variant={`warning`} alert="Please Add Some Items in Cart" />
        </div>
      ) : (
        <div>
          <h3 className="my-4 text-center">Cart</h3>
          <Row>
            <Col lg={8}>
              {cartItem.map((item) => (
                <Row
                  key={item.product}
                  className="border my-3 p-3"
                  style={{ boxSizing: "border-box" }}
                >
                  <Col md={2}>
                    <Link to={`/product/${item.product}`}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="mx-auto d-block cartitem-image"
                      />
                    </Link>
                  </Col>
                  <Col md={8} className="my-3">
                    <p className="text-center">{item.name}</p>
                    <p className="text-center">
                      <span className="fw-bold">Quantity:</span> {item.qty}
                    </p>
                    <p className="text-center"><span className="text-danger">SKU:</span> ##{item.product}</p>
                  </Col>
                  <Col md={2} className="">
                    <p className="w-100 text-center">Price: ${item.price}</p>
                    <Button
                      className="removeItemCart__btn mx-auto d-block bg-danger"
                      onClick={() => dispatch(removeToCart(item.product))}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col lg={4}>
              <div className="border">
                <h4 className="p-3 bg-dark text-center text-light bold">
                  Subtotal ({cartItem.length}) Items
                </h4>
                <h5 className="py-3 pl-3">
                  SUBTOTAL:{" "}
                  <span className="text-danger bold">
                    ${(Math.round(SubTotal * 100) / 100).toFixed(2)}
                  </span>
                </h5>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
