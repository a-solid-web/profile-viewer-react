import React from "react";
import rdf from "rdflib";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { Button } from "yoda-design-system";

const FOAF = new rdf.Namespace("http://xmlns.com/foaf/0.1/");

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      webId: props.webId,
      friendToAdd: "",
      canAddFriend: false
    };
  }

  changeFriendToAdd(e) {
    var xhr = new XMLHttpRequest();
    const url = e.target.value;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          this.setState({
            friendToAdd: url,
            canAddFriend: true
          });
        } else {
          this.setState({
            canAddFriend: false
          });
        }
      }
    };
    const urlRegExp = new RegExp(/(\w+(:\/\/){1})(\w+\.)(\w+\.)(\w+\/)+/g);
    if (urlRegExp.test(e.target.value)) {
      xhr.open("GET", url);
      xhr.send();
    }
  }

  addFriend() {
    let webId = this.props.webId;
    let friendToAdd = this.state.friendToAdd;
    console.log(friendToAdd);
    const store = rdf.graph();
    const updater = new rdf.UpdateManager(store);

    let del = [];
    let ins = rdf.st(
      rdf.sym(webId),
      FOAF("knows"),
      rdf.sym(friendToAdd),
      rdf.sym(webId).doc()
    );
    updater.update(del, ins, (ok, uri, message) => {
      if (ok) console.log("Changes have been applied, reload page to see them");
      else alert(message);
    });
  }

  render() {
    return (
      <div style={{ padding: "3%" }}>
        <Navbar bg="light" variant="light" fixed="top">
          <Navbar.Brand>
            <img src="favicon.ico" width="30" height="30" alt="Solid logo" />
            <span style={{ marginLeft: "5%" }}>Solid Web</span>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <NavLink
              to="/"
              style={{ color: "#000", marginLeft: "10%" }}
            >
              Overview
            </NavLink>
            <NavLink to="/profile" style={{ color: "#000", marginLeft: "10%" }}>
              Profile
              </NavLink>
            <NavLink
              to="/contacts"
              style={{ color: "#000", marginLeft: "10%" }}
            >
              Contacts
            </NavLink>
            <NavLink
              to="/health"
              style={{ color: "#000", marginLeft: "10%" }}
            >
              Health Data
            </NavLink>
          </Nav>
          {this.props.webId ? (
            ""
          ) : (
            <Button onClick={this.props.login}>Login</Button>
          )}
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
