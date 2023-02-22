import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Button,
  ListGroupItem,
  Image,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { productDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";

const ProductDetails = ({ history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(productDetails(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message alert={error} variant="danger" />
      ) : (
        <div>
          <Link to="/" className="btn btn-light my-3">
            <i className="fas fa-arrow-left"></i> Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} ratings`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price: ${product.price}</ListGroupItem>
                <ListGroupItem>{product.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col
                    style={{
                      color: product.countInStock > 0 ? "green" : "red",
                    }}
                  >
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Qty</Col>
                  <Form.Control
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option value={x + 1} key={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  onClick={addToCartHandler}
                >
                  Add To cart
                </Button>
              </ListGroupItem>
            </Col>
          </Row>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
