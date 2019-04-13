import React from "react";
import auth from "solid-auth-client";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class AccessControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      webId: undefined
    };
  }

  componentDidMount() {
    auth.trackSession(session => {
      this.setState({
        webId: session.webId
      });
    });
  }

  render() {
    return (
        <Row>
            <Col lg="1">
            </Col>
            <Col lg="10">
                <p>This is AccessControl</p>
            </Col>
            <Col lg="1">
            </Col>
        </Row>
    )
  }
}

export default AccessControl;
