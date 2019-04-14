import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Container, Col, Row } from "react-bootstrap";

const DetailModal = props => {
  const request = props.request;
  const author = request[0];
  const sender = request[1];
  const avatar = request[2];
  const permissions = request[3][0];
  const requestedRessource = request[4];
  const notification = request[5];
  const requestType = request[6];
  const requestIntent = request[7];
  const requestRisks = request[8];
  const riskEvaluation = request[9];
  const identityEvaluation = request[10];
  const createdValue = request[12]
  const expiresValue = request[13]

  const riskEvaluationMarkup = riskEvaluation ? <p style={{ color: "green"}}>Has provided a risk assesment</p> : <p style={{ color: "red"}}>Has not provided a risk assesment</p>
  const identityEvaluationMarkup = identityEvaluation ? <p style={{ color: "green"}}>Has provided a linked data profile</p> : <p style={{ color: "red"}}>Has not provided an identity</p>
  const expirationAssessment = createdValue !== "" && expiresValue !== "" ? <p style={{ color: "green"}}>Has provided a expiring date to permisions</p> : <p style={{ color: "red"}}>Permission has no expiration</p>

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {author + " wants to " + permissions}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col lg="1" />
            <Col
              lg="5"
              style={{
                padding: "5%",
                backgroundColor: "rgb(248, 248, 248)",
                borderRadius: "8px",
                marginRight: "10px"
              }}
            >
              <Row>
                <h4 style={{ color: "#3256D7" }}>General Information</h4>
              </Row>
              <Row>
                <Col lg="1" />
                <Col lg="5">Request from:</Col>
                <Col lg="5">{sender}</Col>
                <Col lg="1" />
              </Row>
              <Row>
                <Col lg="1" />
                <Col lg="5">Date of Request:</Col>
                <Col lg="5">{createdValue}</Col>
                <Col lg="1" />
              </Row>
              <Row>
                <Col lg="1" />
                <Col lg="5">Expiration Date:</Col>
                <Col lg="5">{expiresValue}</Col>
                <Col lg="1" />
              </Row>
              <Row>
                <Col lg="1" />
                <Col lg="5">Type of Information:</Col>
                <Col lg="5">{requestType}</Col>
                <Col lg="1" />
              </Row>
              <Row>
                <Col lg="1" />
                <Col lg="5">Source:</Col>
                <Col lg="5">{sender}</Col>
                <Col lg="1" />
              </Row>
              <Row>
                <Col lg="1" />
                <Col lg="5">Intent:</Col>
                <Col lg="5">{requestIntent}</Col>
                <Col lg="1" />
              </Row>
            </Col>
            <Col
              lg="5"
              style={{
                padding: "5%",
                backgroundColor: "rgb(248, 248, 248)",
                borderRadius: "8px",
                marginLeft: "10px"
              }}
            >
              <Row>
                <h4 style={{ color: "#3256D7" }}>Possible Risks: </h4>
              </Row>
              <Row>
                <p style={{ color: "#333131" }}>
                  By giving consent to this permission request I am aware that
                  there might be:{" "}
                </p>
              </Row>
              {requestRisks.map((risk, i) => {
                return risk !== "" ?
                (
                  <Row>
                    <Col lg="1" />
                    <Col lg>
                      <li>{risk}</li>
                    </Col>
                    <Col lg="1" />
                  </Row>
                ) : "";
              })}
            </Col>
          </Row>
          <Row>
            <Col lg="1" />
            <Col
              lg
              style={{
                padding: "5%",
                backgroundColor: "rgb(248, 248, 248)",
                borderRadius: "8px",
                marginTop: "10px"
              }}
            >
              <Row>
                <h4 style={{ color: "#3256D7" }}>Evaluation: </h4>
              </Row>
              <Row>
                <Col lg="1" />
                <Col lg>
                  {riskEvaluationMarkup}
                </Col>
                <Col lg="1" />
              </Row>
              <Row>
                <Col lg="1" />
                <Col lg>
                  {identityEvaluationMarkup}
                </Col>
                <Col lg="1" />
              </Row>
              <Row>
                <Col lg="1" />
                <Col lg>
                  {expirationAssessment}
                </Col>
                <Col lg="1" />
              </Row>
            </Col>
            <Col lg="1" />
          </Row>
          <Row>
            {/* <Col lg={{ span: "3", offset: "3" }}>
              <Button
                style={{ backgroundColor: "red" }}
                sender={sender}
                notification={notification}
                id={requestedRessource}
                onClick={props.whenDeny}
              >
                Deny request
              </Button>
            </Col>
            <Col lg={{ span: "3", offset: "3" }}>
              <Button
                style={{ backgroundColor: "green" }}
                sender={sender}
                notification={notification}
                id={requestedRessource}
                onClick={props.whenAccept}
              >
                Accept request
              </Button>
            </Col> */}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailModal;
