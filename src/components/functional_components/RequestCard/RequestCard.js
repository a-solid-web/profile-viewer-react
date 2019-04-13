import React from "react";
import "./RequestCard.css";
import { Button } from "yoda-design-system";

class RequestCard extends React.Component {
  render() {
    const request = this.props.request;
    const author = request[0];
    const sender = request[1];
    const avatar = request[2];
    const permissions = request[3];
    const requestedRessource = request[4];

    return (
      <div className="requestcard">
        <div className="requestcard-header">
          <img
            className="requestcard-header-avatar"
            src={avatar}
            alt="avatar"
          />
          <strong>{author}</strong> wants to:
        </div>
        {permissions.map((permission, j) => {
          return (
            <div className="requestcard-request" key={j}>
              {permission}
              <div>
                <Button
                  className="requestcard-request-button"
                  variant="outlined"
                  sender={sender}
                  id={requestedRessource}
                  onClick={this.props.onAccept}
                >
                  Accept
                </Button>
                <Button
                  className="requestcard-request-button"
                  variant="outlined"
                  sender={sender}
                  id={requestedRessource}
                  onClick={this.props.onDeny}
                >
                  Deny
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default RequestCard;
