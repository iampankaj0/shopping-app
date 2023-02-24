import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const ProductScreen = ({ product }) => {
  return (
    <>
      <Card className="my-3 px-3 pt-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top"></Card.Img>
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <div className="my-3">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </div>
          </Card.Text>
          <Card.Text as="div">$ {product.price}</Card.Text>
          <Link
            to={`/product/${product._id}`}
            className="mt-3 w-100 btn btn-dark"
          >
            See Details
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductScreen;
