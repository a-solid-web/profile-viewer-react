import React from "react";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Typography, Button } from "yoda-design-system";

const JobSlot = props => {
  const job = props.job[0];

  let jobDisplay = props.editMode ? (
    <FormControl
      placeholder={job}
      onChange={props.onChange}
      onBlur={props.onBlur}
      defaultValue={job}
    />
  ) : (
    <p onClick={props.onClick}>{job}</p>
  );

  return (
    <Row>
      <Col lg="3">
        <Typography variant="subtitle">Job</Typography>
      </Col>
      <Col md="6">
        <Row style={{ width: "100%" }}>{jobDisplay}</Row>
      </Col>
      <Col lg="3">
        <Button onClick={props.onToggleAccess} id="job" index={props.index}>
          Change Access
        </Button>
      </Col>
    </Row>
  );
};

export default JobSlot;
