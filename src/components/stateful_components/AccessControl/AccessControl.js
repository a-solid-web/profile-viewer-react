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
              onClick={this.toggleTelephoneAccess}
            >
              Private
            </Dropdown.Item>
          </div>
        ) : (
          <div>
            <Dropdown.Item
              id={this.props.telephone[1].value + "?" + this.props.telephone[0]}
              onClick={this.toggleTelephoneAccess}
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
