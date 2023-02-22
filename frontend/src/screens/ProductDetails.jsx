import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Button,
  ListGroupItem,
  Image,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { productDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(productDetails(productId));
  }, [dispatch, productId]);

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
                <Button className="btn-block" type="button">
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
