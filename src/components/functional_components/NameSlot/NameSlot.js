import React from "react";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Typography, Button } from "yoda-design-system";

const NameSlot = props => {
  const name = props.name[0];

  let nameDisplay = props.editMode ? (
    <FormControl
      placeholder={name}
      onChange={props.onChange}
      onBlur={props.onBlur}
      defaultValue={name}
    />
  ) : (
    <p onClick={props.onClick}>{name}</p>
  );

  return (
    <Row>
      <Col lg="3">
        <Typography variant="subtitle">Name</Typography>
      </Col>
      <Col md="6">
        <Row>{nameDisplay}</Row>
      </Col>
      <Col lg="3">
        <Button onClick={props.onToggleAccess} id="name" index={props.index}>
          Change Access
        </Button>
      </Col>
    </Row>
  );
};

export default NameSlot;
