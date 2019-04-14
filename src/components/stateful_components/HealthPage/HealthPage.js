import React from "react";
import rdf from "rdflib";
import auth from "solid-auth-client";
import UploadPicture from "../../functional_components/UploadPicture/UploadPicture";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

const LDP = rdf.Namespace("http://www.w3.org/ns/ldp#");

class HealthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      webId: undefined,
      picture: undefined
    };
  }

  uploadPic(e) {
    var filePath = e.target.files[0];
    var store = rdf.graph();
    var fetcher = new rdf.Fetcher(store);

    let webId = this.state.webId;

    var reader = new FileReader();
    reader.onload = function() {
      var data = this.result;
      var filename = encodeURIComponent(filePath.name);
      var contentType = "image";
      let pictureURl = webId.replace(
        "/profile/card#me",
        "/health/" + filename
      );
      fetcher.webOperation("PUT", pictureURl, {
        data: data,
        contentType: contentType
      });
    };
    reader.readAsArrayBuffer(filePath);
    this.fetchPictures();
  }

  fetchPictures() {
    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);

    const healthDataAddress = this.state.webId.replace(
      "profile/card#me",
      "health/"
    );

    fetcher.load(healthDataAddress).then(response => {
      const picture = store.any(rdf.sym(healthDataAddress), LDP("contains"));
      this.setState({
        picture: picture ? picture.value : ""
      });
    });
  }

  componentDidMount() {
    auth.trackSession(session => {
      this.setState({
        webId: session.webId
      });
      this.fetchPictures();
    });
  }

  render() {
    const pictureMarkup = this.state.picture ? (
      <img src={this.state.picture} alt="Here is your medical data"/>
    ) : (
      ""
    );
    return (
      <Container>
        <Col lg="1" />
        <Col lg="10">
          <div style={{ margin: "5%" }}>{pictureMarkup}</div>
          <UploadPicture onChange={this.uploadPic.bind(this)} />
        </Col>
        <Col lg="1" />
      </Container>
    );
  }
}

export default HealthPage;
