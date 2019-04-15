import React from "react";
import auth from "solid-auth-client";
import rdf from "rdflib";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

const VCARD = new rdf.Namespace("http://www.w3.org/2006/vcard/ns#");
const FOAF = new rdf.Namespace("http://xmlns.com/foaf/0.1/");

class AccessControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      webId: undefined,
      accessView: props.accessView
    };
  }

  getPredicate(type) {
    switch (type) {
      case "bio":
        return VCARD("note");
      case "job":
        return VCARD("role");
      default:
        return FOAF("name");
    }
  }

  toggleAccess(e) {
    const webId = this.state.webId;
    const privateDoc = webId.replace("profile", "private");
    const value = e.target.id;

    const predicate = this.getPredicate(e.target.getAttribute("type"));

    const store = rdf.graph();
    const updater = new rdf.UpdateManager(store);

    const access = e.target.innerHTML;

    if (access === "Private") {
      const delPublic = [
        rdf.st(rdf.sym(webId), predicate, rdf.lit(value), rdf.sym(webId).doc())
      ];

      const insPublic = [
        rdf.st(
          rdf.sym(webId),
          predicate,
          rdf.lit("Request Access"),
          rdf.sym(webId).doc()
        )
      ];

      updater.update(delPublic, insPublic, (uri, ok, message) => {
        if (ok) console.log("Made public");
        else alert(message);
      });

      const delPrivate = [];

      const insPrivate = [
        rdf.st(
          rdf.sym(privateDoc),
          predicate,
          rdf.lit(value),
          rdf.sym(privateDoc).doc()
        )
      ];

      updater.update(delPrivate, insPrivate, (uri, ok, message) => {
        if (ok) console.log("Made private");
        else alert(message);
      });
    } else if (access === "Public") {
      const delPublic = [
        rdf.st(
          rdf.sym(webId),
          predicate,
          rdf.lit("Request Access"),
          rdf.sym(webId).doc()
        )
      ];

      const insPublic = [
        rdf.st(rdf.sym(webId), predicate, rdf.lit(value), rdf.sym(webId).doc())
      ];

      updater.update(delPublic, insPublic, (uri, ok, message) => {
        if (ok) console.log("Made public");
        else alert(message);
      });

      const delPrivate = [
        rdf.st(
          rdf.sym(privateDoc),
          predicate,
          rdf.lit(value),
          rdf.sym(privateDoc).doc()
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
    const blankIdFolder = blankId.split("/")[3];
    const privateBlankId =
      blankIdFolder === "profile"
        ? blankId.replace("profile", "private")
        : blankId;
    const publicBlankId =
      blankIdFolder === "profile"
        ? blankId
        : blankId.replace("private", "profile");
    const value = e.target.id.split("?")[1];

    const predicate =
      e.target.getAttribute("type") === "email"
        ? VCARD("hasEmail")
        : VCARD("hasTelephone");

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
          predicate,
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
        if (ok) console.log("Made private");
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
        ),
        rdf.st(
          rdf.sym(privateDoc + "#me"),
          predicate,
          rdf.sym(privateBlankId),
          rdf.sym(privateDoc).doc()
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

  getDropDownMarkup() {
    var access;
    var id;
    var type;
    switch (this.state.accessView) {
      case "telephone":
        access = this.props.telephone[3];
        id = this.props.telephone[1].value + "?" + this.props.telephone[0];
        type = "telephone";
        break;
      case "email":
        access = this.props.email[3];
        id = this.props.email[1] + "?" + this.props.email[0];
        type = "email";
        break;
      case "bio":
        access = this.props.bio[1];
        id = this.props.bio[0];
        type = "bio";
        break;
      case "job":
        access = this.props.job[1];
        id = this.props.job[0];
        type = "job";
        break;
      case "name":
        access = this.props.name[1];
        id = this.props.name[0];
        type = "name";
        break;
      default:
        return "";
    }

    const dropDownMarkup =
      access === "public" ? (
        <div>
          <Dropdown.Item disabled>Public</Dropdown.Item>
          <Dropdown.Item
            id={id}
            onClick={
              type !== "email" || type !== "telephone"
                ? this.toggleAccess.bind(this)
                : this.toggleBlankIdAccess
            }
            type={type}
          >
            Private
          </Dropdown.Item>
        </div>
      ) : (
        <div>
          <Dropdown.Item
            id={id}
            onClick={
              type !== "email" || type !== "telephone"
                ? this.toggleAccess.bind(this)
                : this.toggleBlankIdAccess
            }
            type={type}
          >
            Public
          </Dropdown.Item>
          <Dropdown.Item disabled>Private</Dropdown.Item>
        </div>
      );
    return dropDownMarkup;
  }

  render() {
    const dropDownMarkup = this.getDropDownMarkup();

    return (
      <Row onLoad={this.props.onComplete}>
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