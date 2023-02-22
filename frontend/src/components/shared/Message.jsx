import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, alert }) => {
  return <Alert variant={variant}>{alert}</Alert>;
};

export default Message;
