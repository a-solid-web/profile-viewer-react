import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import { Typography, Button } from "yoda-design-system";

const BioSlot = props => {
  const bio = props.bio[0];

  let bioDisplay = props.editMode ? (
    <FormControl
      placeholder={bio}
      onChange={props.onChange}
      onBlur={props.onBlur}
      defaultValue={bio}
    />
  ) : (
    <p onClick={props.onClick}>{bio}</p>
  );

  return (
    <div>
      <Row />
      <Row>
        <Col lg="3">
          <Typography variant="subtitle">Bio</Typography>
        </Col>
        <Col lg="6">
          <Row>{bioDisplay}</Row>
        </Col>
        <Col lg="3">
          <Button
            onClick={props.onToggleAccess}
            id="bio"
            index={props.index}
          >
            Change Access
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default BioSlot;
