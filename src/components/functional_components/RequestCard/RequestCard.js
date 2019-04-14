import React from "react";
import "./RequestCard.css";
import { Button, Typography } from "yoda-design-system";
import { Col, Row } from "react-bootstrap";

const RequestCard = props => {
  const request = props.request;
  const author = request[0];
  const sender = request[1];
  const avatar = request[2];
  const permissions = request[3];
  const requestedRessource = request[4];
  const notification = request[5];
  const requestStatus = request[11];

  return (
    <div className="requestcard">
      <div className="requestcard-header">
        <img className="requestcard-header-avatar" src={avatar} alt="avatar" />
        <strong>{author}</strong> wants to: {requestStatus == "Accepted" ? <Typography style={{ color: "green", marginLeft: "20%" }}>Accepted</Typography> : ""}
      </div>
      {permissions.map((permission, j) => {
        return (
          <div className="requestcard-request" key={j}>
            <Col>{permission}</Col>
            <Col>
              <p
                style={{ color: "#00F" }}
                onClick={props.onToggle}
                index={props.index}
              >
                More Information
              </p>
            </Col>
            {requestStatus == "Accepted" ? (
              <Row>
                <Col lg="6">
                  <Button
                    onClick={props.onRevoke}
                    variant="outlined"
                    sender={sender}
                    notification={notification}
                    id={requestedRessource}
                  >
                    Revoke
                  </Button>
                </Col>
              </Row>
            ) : (
              <div>
                <Button
                  className="requestƒcard-request-button"
                  variant="outlined"
                  sender={sender}
                  notification={notification}
                  id={requestedRessource}
                  onClick={props.onAccept}
                >
                  Accept
                </Button>
                <Button
                  className="requestcard-request-button"
                  variant="outlined"
                  sender={sender}
                  notification={notification}
                  id={requestedRessource}
                  onClick={props.onDeny}
                >
                  Deny
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RequestCard;
