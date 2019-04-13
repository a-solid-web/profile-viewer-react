import React from "react";
import auth from "solid-auth-client";
import rdf from "rdflib";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

const VCARD = new rdf.Namespace("http://www.w3.org/2006/vcard/ns#");

class AccessControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      webId: undefined,
      accessView: props.accessView
    };
  }

  toggleTelephoneAccess(e) {
    const telephoneBlankId = e.target.id.split("?")[0];
    const telephonePrivateBlankId = telephoneBlankId.replace("profile", "private");
    const telephoneValue = e.target.id.split("?")[1];

    const telephoneDoc = telephoneBlankId.split("#")[0];
    const telephonePrivateDoc = telephoneDoc.replace("profile", "private");

    const store = rdf.graph();
    const updater = new rdf.UpdateManager(store);

    const access = e.target.innerHTML;

    if (access === "Private") {
      const delPublic = [
        rdf.st(
          rdf.sym(telephoneBlankId),
          VCARD("value"),
          rdf.sym(telephoneValue),
          rdf.sym(telephoneDoc).doc()
        )
      ];

      const insPublic = [
        rdf.st(
          rdf.sym(telephoneBlankId),
          VCARD("value"),
          rdf.lit("Request Access"),
          rdf.sym(telephoneDoc).doc()
        )
      ];

      updater.update(delPublic, insPublic, (uri, ok, message) => {
        if (ok) console.log("Made public");
        else alert(message);
      });

      const delPrivate = [];

      const insPrivate = [
        rdf.st(
            rdf.sym(telephonePrivateDoc + "#me"),
            VCARD("hasTelephone"),
            rdf.sym(telephonePrivateBlankId),
            rdf.sym(telephonePrivateDoc).doc()
        ),
        rdf.st(
          rdf.sym(telephonePrivateBlankId),
          VCARD("value"),
          rdf.sym(telephoneValue),
          rdf.sym(telephonePrivateDoc).doc()
        )
      ];

      updater.update(delPrivate, insPrivate, (uri, ok, message) => {
        if (ok) console.log("Made public");
        else alert(message);
      });
    } else if (access === "Public") {
      const delPublic = [
        rdf.st(
          rdf.sym(telephoneBlankId),
          VCARD("value"),
          rdf.lit("Request Access"),
          rdf.sym(telephoneDoc).doc()
        )
      ];

      const insPublic = [
        rdf.st(
          rdf.sym(telephoneBlankId),
          VCARD("value"),
          rdf.sym(telephoneValue),
          rdf.sym(telephoneDoc).doc()
        )
      ];

      updater.update(delPublic, insPublic, (uri, ok, message) => {
        if (ok) console.log("Made public");
        else alert(message);
      });

      const delPrivate = [
        rdf.st(
          rdf.sym(telephonePrivateBlankId),
          VCARD("value"),
          rdf.sym(telephoneValue),
          rdf.sym(telephonePrivateDoc).doc()
        )
      ];

      const insPrivate = [];

      updater.update(delPrivate, insPrivate, (uri, ok, message) => {
        if (ok) console.log("Made public");
        else alert(message);
      });
    }
  }

  toggleBlankIdAccess(e) {
    const blankId = e.target.id.split("?")[0];
    const blankIdFolder = blankId.split("/")[3]
    const privateBlankId = blankIdFolder === "profile" ? blankId.replace("profile", "private") : blankId;
    const publicBlankId = blankIdFolder === "profile" ? blankId : blankId.replace("private", "profile");
    const value = e.target.id.split("?")[1];

    const doc = blankId.split("#")[0];
    const privateDoc = doc.replace("profile", "private");

    const store = rdf.graph();
    const updater = new rdf.UpdateManager(store);

    const access = e.target.innerHTML;

    if (access === "Private") {
      const delPublic = [
        rdf.st(
          rdf.sym(publicBlankId),
          VCARD("value"),
          rdf.sym(value),
          rdf.sym(doc).doc()
        )
      ];

      const insPublic = [
        rdf.st(
          rdf.sym(publicBlankId),
          VCARD("value"),
          rdf.lit("Request Access"),
          rdf.sym(doc).doc()
        )
      ];

      updater.update(delPublic, insPublic, (uri, ok, message) => {
        if (ok) console.log("Made public");
        else alert(message);
      });

      const delPrivate = [];

      const insPrivate = [
        rdf.st(
            rdf.sym(privateDoc + "#me"),
            VCARD("hasTelephone"),
            rdf.sym(privateBlankId),
            rdf.sym(privateDoc).doc()
        ),
        rdf.st(
          rdf.sym(privateBlankId),
          VCARD("value"),
          rdf.sym(value),
          rdf.sym(privateDoc).doc()
        )
      ];

      updater.update(delPrivate, insPrivate, (uri, ok, message) => {
        if (ok) console.log("Made public");
        else alert(message);
      });
    } else if (access === "Public") {
      const delPublic = [
        rdf.st(
          rdf.sym(publicBlankId),
          VCARD("value"),
          rdf.lit("Request Access"),
          rdf.sym(publicBlankId).doc()
        )
      ];

      const insPublic = [
        rdf.st(
          rdf.sym(publicBlankId),
          VCARD("value"),
          rdf.sym(value),
          rdf.sym(publicBlankId).doc()
        )
      ];

      updater.update(delPublic, insPublic, (uri, ok, message) => {
        if (ok) console.log("Made public");
        else alert(message);
      });

      const delPrivate = [
        rdf.st(
          rdf.sym(privateBlankId),
          VCARD("value"),
          rdf.sym(value),
          rdf.sym(privateBlankId).doc()
        )
      ];

      const insPrivate = [];

      updater.update(delPrivate, insPrivate, (uri, ok, message) => {
        if (ok) console.log("Made public");
        else alert(message);
      });
    }
  }

  componentDidMount() {
    auth.trackSession(session => {
      this.setState({
        webId: session.webId
      });
    });
  }

  getTelephoneMarkup() {
    if (this.state.accessView === "telephone") {
      const access = this.props.telephone[3];
      const dropDownMarkup =
        access === "public" ? (
          <div>
            <Dropdown.Item disabled>Public</Dropdown.Item>
            <Dropdown.Item
              id={this.props.telephone[1].value + "?" + this.props.telephone[0]}
              onClick={this.toggleBlankIdAccess}
            >
              Private
            </Dropdown.Item>
          </div>
        ) : (
          <div>
            <Dropdown.Item
              id={this.props.telephone[1].value + "?" + this.props.telephone[0]}
              onClick={this.toggleBlankIdAccess}
            >
              Public
            </Dropdown.Item>
            <Dropdown.Item disabled>Private</Dropdown.Item>
          </div>
        );
      return dropDownMarkup;
    }
  }

  render() {
    const dropDownMarkup = this.getTelephoneMarkup();

    return (
      <Row>
        <Col lg="1" />
        <Col lg="10">
          <Dropdown size="sm">
            <Dropdown.Toggle variant="secondary">Access</Dropdown.Toggle>
            <Dropdown.Menu>{dropDownMarkup}</Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col lg="1" />
      </Row>
    );
  }
}

export default AccessControl;
