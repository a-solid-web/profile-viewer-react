import React from "react";
import rdf from "rdflib";
import auth from "solid-auth-client";
import { Button } from "yoda-design-system";
import ProfilePicture from "../../functional_components/ProfilePicture";
import NameSlot from "../../functional_components/NameSlot";
import BioSlot from "../../functional_components/BioSlot";
import EmailSlot from "../../functional_components/EmailSlot";
import TelephoneSlot from "../../functional_components/TelephoneSlot";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import JobSlot from "../../functional_components/JobSlot";
import AccessControl from "../AccessControl";

const FOAF = new rdf.Namespace("http://xmlns.com/foaf/0.1/");
const VCARD = new rdf.Namespace("http://www.w3.org/2006/vcard/ns#");
const RDF = new rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      webId: undefined,
      name: [],
      picture: "",
      emails: [],
      job: [],
      bio: [],
      telephones: [],
      newName: "",
      editName: false,
      newBio: "",
      editBio: false,
      newEmail: "",
      editEmail: false,
      newTelephone: "",
      editTelephone: false,
      newJob: "",
      editJob: false,
      accessView: "",
      accessIndex: ""
    };
  }

  fetchUser = () => {
    auth.trackSession(session => {
      if (!session) {
        console.log("You are not logged in");
      } else {
        const webId = session.webId;
        const privateCard = webId.replace("profile", "private");

        const store = rdf.graph();
        const fetcher = new rdf.Fetcher(store);
        const updater = new rdf.UpdateManager(store);

        fetcher.load(webId).then(() => {
          const names = store.each(rdf.sym(webId), FOAF("name")).map(name => {
            return [name.value, "public"];
          });

          const picture = store.any(rdf.sym(webId), VCARD("hasPhoto"));
          const pictureValue = picture ? picture.value : "";

          const jobs = store.each(rdf.sym(webId), VCARD("role")).map(job => {
            return [job.value, "public"];
          });

          const bios = store.each(rdf.sym(webId), VCARD("note")).map(bio => {
            return [bio.value, "public"];
          });

          const emails = store
            .each(rdf.sym(webId), VCARD("hasEmail"))
            .map(emailBlankId => {
              const email = store.any(rdf.sym(emailBlankId), VCARD("value"));
              const emailValue = email.value;

              const emailType = store.any(rdf.sym(emailBlankId), RDF("type"));
              const emailTypeValue = emailType
                ? emailType.value.split("#")[1] + "-Email"
                : "Email";

              return [emailValue, emailBlankId.value, emailTypeValue, "public"];
            });

          const telephones = store
            .each(rdf.sym(webId), VCARD("hasTelephone"))
            .map(telephoneBlankId => {
              const telephone = store.any(
                rdf.sym(telephoneBlankId),
                VCARD("value")
              );
              const telephoneValue = telephone.value;

              const telephoneType = store.any(
                rdf.sym(telephoneBlankId),
                RDF("type")
              );
              const telephoneTypeValue = telephoneType
                ? telephoneType.value.split("#")[1] + "-Phone"
                : "Phone";

              return [
                telephoneValue,
                telephoneBlankId,
                telephoneTypeValue,
                "public"
              ];
            });

          this.setState({
            webId: webId,
            name: names,
            picture: pictureValue,
            emails: emails,
            job: jobs,
            bio: bios,
            telephones: telephones,
            newName: names[0],
            editMode: false
          });
        });

        fetcher
          .load(privateCard)
          .then(response => {
            const names = store
              .each(rdf.sym(privateCard), FOAF("name"))
              .map(name => {
                return [name.value, "private"];
              });

            const mergedNames = this.state.name.concat(names);

            const jobs = store
              .each(rdf.sym(privateCard), VCARD("role"))
              .map(job => {
                return [job.value, "private"];
              });

            const mergedJobs = this.state.job.concat(jobs);

            const bios = store
              .each(rdf.sym(privateCard), VCARD("note"))
              .map(bio => {
                return [bio.value, "private"];
              });

            const mergedBios = this.state.bio.concat(bios);

            const emails = store
              .each(rdf.sym(privateCard), VCARD("hasEmail"))
              .map(emailBlankId => {
                const email = store.any(rdf.sym(emailBlankId), VCARD("value"));
                const emailValue = email.value;

                const emailType = store.any(rdf.sym(emailBlankId), RDF("type"));
                const emailTypeValue = emailType
                  ? emailType.value.split("#")[1] + "-Email"
                  : "Email";

                return [
                  emailValue,
                  emailBlankId.value,
                  emailTypeValue,
                  "private"
                ];
              });

            const mergedEmails = this.state.emails.concat(emails);

            console.log(privateCard);
            const telephones = store
              .each(rdf.sym(privateCard), VCARD("hasTelephone"))
              .map(telephoneBlankId => {
                const telephone = store.any(
                  rdf.sym(telephoneBlankId),
                  VCARD("value")
                );
                const telephoneValue = telephone.value;
                console.log(telephoneValue);

                const telephoneType = store.any(
                  rdf.sym(telephoneBlankId),
                  RDF("type")
                );

                const telephoneTypeValue = telephoneType
                  ? telephoneType.value.split("#")[1] + "-Phone"
                  : "Phone";

                return [
                  telephoneValue,
                  telephoneBlankId,
                  telephoneTypeValue,
                  "private"
                ];
              });

            const mergedTelephones = this.state.telephones.concat(telephones);

            this.setState({
              webId: webId,
              name: mergedNames,
              emails: mergedEmails,
              job: mergedJobs,
              bio: mergedBios,
              telephones: mergedTelephones,
              newName: names[0],
              editMode: false
            });
          })
          .catch(err => {
            let newPrivateProfile;
            newPrivateProfile = [
              rdf.st(rdf.sym(privateCard), RDF("type"), FOAF("Person"))
            ];
            updater.put(
              rdf.sym(privateCard),
              newPrivateProfile,
              "text/turtle",
              function(uri, ok, message) {
                if (ok) console.log("New Private Card has been created");
                else console.log(message);
              }
            );
          });
      }
    });
  };

  setProfilePicture = e => {
    var filePath = e.target.files[0];
    var store = rdf.graph();
    var fetcher = new rdf.Fetcher(store);

    let webId = this.props.webId;
    let currentPicture = this.state.picture;

    var reader = new FileReader();
    reader.onload = function() {
      var data = this.result;
      var filename = encodeURIComponent(filePath.name);
      var contentType = "image";
      let pictureURl = webId.replace("card#me", filename);
      fetcher
        .webOperation("PUT", pictureURl, {
          data: data,
          contentType: contentType
        })
        .then(response => {
          if (response.status === 201) {
            const updater = new rdf.UpdateManager(store);
            let del = currentPicture
              ? rdf.st(
                  rdf.sym(webId),
                  VCARD("hasPhoto"),
                  rdf.sym(currentPicture),
                  rdf.sym(webId).doc()
                )
              : [];
            let ins = rdf.st(
              rdf.sym(webId),
              VCARD("hasPhoto"),
              rdf.sym(pictureURl),
              rdf.sym(webId).doc()
            );
            updater.update(del, ins, (uri, ok, message) => {
              if (ok)
                console.log(
                  "Changes have been applied, reload page to see them"
                );
              else alert(message);
            });
          }
        });
    };
    reader.readAsArrayBuffer(filePath);
  };

  applyNameChanges(e) {
    const oldName = e.target.placeholder;
    const store = rdf.graph();
    const updater = new rdf.UpdateManager(store);

    var del;
    var ins;

    del = rdf.st(
      rdf.sym(this.props.webId),
      FOAF("name"),
      rdf.lit(oldName),
      rdf.sym(this.props.webId).doc()
    );
    ins = rdf.st(
      rdf.sym(this.props.webId),
      FOAF("name"),
      rdf.lit(this.state.newName),
      rdf.sym(this.props.webId).doc()
    );

    var updatePromise = new Promise((resolve, reject) => {
      updater.update(del, ins, (uri, ok, message) => {
        if (ok) {
          console.log("Changes have been applied!");
          resolve();
        } else reject(message);
      });
      this.setState({ editName: false });
    });
    updatePromise.then(() => {
      this.fetchUser();
    });
  }

  getNewName(e) {
    this.setState({ newName: e.target.value });
  }

  toggleEditName() {
    this.setState({ editName: !this.state.editName });
  }

  applyBioChanges(e) {
    const oldBio = e.target.placeholder;
    const store = rdf.graph();
    const updater = new rdf.UpdateManager(store);

    var del;
    var ins;

    del = rdf.st(
      rdf.sym(this.props.webId),
      VCARD("note"),
      rdf.lit(oldBio),
      rdf.sym(this.props.webId).doc()
    );
    ins = rdf.st(
      rdf.sym(this.props.webId),
      VCARD("note"),
      rdf.lit(this.state.newBio),
      rdf.sym(this.props.webId).doc()
    );

    var updatePromise = new Promise((resolve, reject) => {
      updater.update(del, ins, (uri, ok, message) => {
        if (ok) {
          console.log("Changes have been applied!");
          resolve();
        } else reject(message);
      });
      this.setState({ editBio: false });
    });
    updatePromise.then(() => {
      this.fetchUser();
    });
  }

  getNewBio(e) {
    this.setState({ newBio: e.target.value });
  }

  toggleEditBio() {
    this.setState({ editBio: !this.state.editBio });
  }

  applyEmailChanges(e) {
    if (this.state.newEmail !== "") {
      const oldEmail = e.target.placeholder;
      const oldEmailBlankId = e.target.id;

      const store = rdf.graph();
      const updater = new rdf.UpdateManager(store);

      var del;
      var ins;

      del = rdf.st(
        rdf.sym(oldEmailBlankId),
        VCARD("value"),
        rdf.sym("mailto:" + oldEmail),
        rdf.sym(this.state.webId).doc()
      );
      ins = rdf.st(
        rdf.sym(oldEmailBlankId),
        VCARD("value"),
        rdf.sym("mailto:" + this.state.newEmail),
        rdf.sym(this.state.webId).doc()
      );

      var updatePromise = new Promise((resolve, reject) => {
        updater.update(del, ins, (uri, ok, message) => {
          if (ok) {
            resolve();
          } else reject(message);
        });
      });
      updatePromise.then(() => {
        this.setState({ editEmail: false });
        this.fetchUser();
      });
    } else {
      this.setState({ editEmail: false });
    }
  }

  getNewEmail(e) {
    this.setState({ newEmail: e.target.value });
  }

  toggleEditEmail() {
    this.setState({ editEmail: !this.state.editEmail });
  }

  applyJobChanges(e) {
    const oldJob = e.target.placeholder;
    const store = rdf.graph();
    const updater = new rdf.UpdateManager(store);

    var del;
    var ins;

    del = rdf.st(
      rdf.sym(this.props.webId),
      VCARD("role"),
      rdf.lit(oldJob),
      rdf.sym(this.props.webId).doc()
    );
    ins = rdf.st(
      rdf.sym(this.props.webId),
      VCARD("role"),
      rdf.lit(this.state.newJob),
      rdf.sym(this.props.webId).doc()
    );

    var updatePromise = new Promise((resolve, reject) => {
      updater.update(del, ins, (uri, ok, message) => {
        if (ok) {
          resolve();
        } else reject(message);
      });
    });
    updatePromise.then(() => {
      this.setState({ editJob: false });
      this.fetchUser();
    });
  }

  getNewJob(e) {
    this.setState({ newJob: e.target.value });
  }

  toggleEditJob() {
    this.setState({ editJob: !this.state.editJob });
  }

  applyTelephoneChanges(e) {
    if (this.state.newTelephone !== "") {
      const oldTelephone = e.target.placeholder;
      const oldTelephoneBlankId = e.target.id;

      const store = rdf.graph();
      const updater = new rdf.UpdateManager(store);

      var del;
      var ins;

      del = rdf.st(
        rdf.sym(oldTelephoneBlankId),
        VCARD("value"),
        rdf.sym("tel:" + oldTelephone),
        rdf.sym(this.state.webId).doc()
      );
      ins = rdf.st(
        rdf.sym(oldTelephoneBlankId),
        VCARD("value"),
        rdf.sym("tel:" + this.state.newTelephone),
        rdf.sym(this.state.webId).doc()
      );

      var updatePromise = new Promise((resolve, reject) => {
        updater.update(del, ins, (uri, ok, message) => {
          if (ok) {
            resolve();
          } else reject(message);
        });
      });
      updatePromise.then(() => {
        this.setState({ editTelephone: false });
        this.fetchUser();
      });
    } else {
      this.setState({ editTelephone: false });
    }
  }

  getNewTelephone(e) {
    this.setState({ newTelephone: e.target.value });
  }

  toggleEditTelephone() {
    this.setState({ editTelephone: !this.state.editTelephone });
  }

  componentDidMount() {
    this.fetchUser();
  }

  changeAccessView(e) {
    this.setState({
      accessView: e.target.id,
      accessIndex: e.target.attributes[1].value
    });
  }

  createAccessView() {
    switch (this.state.accessView) {
      case "telephone":
        const telephone = this.state.telephones[this.state.accessIndex];
        return (
          <AccessControl
            accessView={this.state.accessView}
            telephone={telephone}
          />
        );
      case "email":
        const email = this.state.emails[this.state.accessIndex];
        return (
          <AccessControl accessView={this.state.accessView} email={email} />
        );
      case "bio":
        const bio = this.state.bio[this.state.accessIndex];
        return <AccessControl accessView={this.state.accessView} bio={bio} />;
      case "job":
        const job = this.state.job[this.state.accessIndex];
        return <AccessControl accessView={this.state.accessView} job={job} />;
      default:
        return "";
    }
  }

  render() {
    let nameSlotMarkup = this.state.name.map((name, index) => {
      if (name[0] === "Request Access") {
        return "";
      }
      return (
        <NameSlot
          name={name}
          key={index}
          editMode={this.state.editName}
          onBlur={this.applyNameChanges.bind(this)}
          onChange={this.getNewName.bind(this)}
          onClick={this.toggleEditName.bind(this)}
        />
      );
    });

    let jobSlotMarkup = this.state.job.map((job, index) => {
      if (job[0] === "Request Access") {
        return "";
      }
      return (
        <JobSlot
          job={job}
          key={index}
          index={index}
          editMode={this.state.editJob}
          onBlur={this.applyJobChanges.bind(this)}
          onChange={this.getNewJob.bind(this)}
          onClick={this.toggleEditJob.bind(this)}
          onToggleAccess={this.changeAccessView.bind(this)}
        />
      );
    });

    let bioSlotMarkup = this.state.bio.map((bio, index) => {
      if (bio[0] === "Request Access") {
        return "";
      }
      return (
        <BioSlot
          bio={bio}
          key={index}
          index={index}
          editMode={this.state.editBio}
          onBlur={this.applyBioChanges.bind(this)}
          onChange={this.getNewBio.bind(this)}
          onClick={this.toggleEditBio.bind(this)}
          onToggleAccess={this.changeAccessView.bind(this)}
        />
      );
    });

    let emailSlotsMarkup = this.state.emails.map((email, index) => {
      if (email[0] === "Request Access") {
        return "";
      }
      return (
        <EmailSlot
          key={index}
          index={index}
          email={email}
          editMode={this.state.editEmail}
          onChange={this.getNewEmail.bind(this)}
          onClick={this.toggleEditEmail.bind(this)}
          onBlur={this.applyEmailChanges.bind(this)}
          onToggleAccess={this.changeAccessView.bind(this)}
        />
      );
    });

    let telephoneSlotsMarkup = this.state.telephones.map((telephone, index) => {
      if (telephone[0] === "Request Access") {
        return "";
      }
      return (
        <TelephoneSlot
          key={index}
          index={index}
          telephone={telephone}
          editMode={this.state.editTelephone}
          onChange={this.getNewTelephone.bind(this)}
          onClick={this.toggleEditTelephone.bind(this)}
          onBlur={this.applyTelephoneChanges.bind(this)}
          onToggleAccess={this.changeAccessView.bind(this)}
        />
      );
    });

    let accessViewMarkup = this.createAccessView();

    return (
      <Row>
        <Col lg="1" />
        <Col lg="6">
          {this.props.webId ? (
            <div>
              <Row>
                <Col>
                  <ProfilePicture
                    picture={this.state.picture}
                    onChange={this.setProfilePicture}
                  />
                </Col>
                <Col>
                  {nameSlotMarkup}
                  {jobSlotMarkup}
                  {bioSlotMarkup}
                  {emailSlotsMarkup}
                  {telephoneSlotsMarkup}
                </Col>
              </Row>
              <Row>
                <Button onClick={this.props.logout}>Logout</Button>
              </Row>
            </div>
          ) : (
            <p>You are not logged in...</p>
          )}
        </Col>
        <Col lg="5">{accessViewMarkup}</Col>
      </Row>
    );
  }
}

export default Profile;
