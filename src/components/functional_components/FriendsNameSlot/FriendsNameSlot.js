import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Typography } from "yoda-design-system";

const FriendsNameSlot = props => {
  return (
    <Row>
      <Col lg="3">
        <Typography variant="subtitle">Name</Typography>
      </Col>
      <Col md="9">
        <Row>
          <Typography variant="paragraph">{props.name}</Typography>
        </Row>
      </Col>
    </Row>
  );
};

export default FriendsNameSlot;
