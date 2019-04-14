import React from "react";
import rdf from "rdflib";
import auth from "solid-auth-client";
import "./OverviewPage.css";
import RequestCard from "../../functional_components/RequestCard";
import DetailModal from "../../functional_components/DetailModal";

const LDP = rdf.Namespace("http://www.w3.org/ns/ldp#");
const ACL = rdf.Namespace("http://www.w3.org/ns/auth/acl#");
const PREQ = rdf.Namespace(
  "https://a-solid-web.github.io/permission-ontology/permissionrequests.rdf#"
);

class OverviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.addRequest = this.addRequest.bind(this);
    this.removeRequest = this.removeRequest.bind(this);
    this.fetchNotificationAddresses = this.fetchNotificationAddresses.bind(
      this
    );
    this.fetchNotification = this.fetchNotification.bind(this);

    this.state = {
      webId: this.props.webId,
      requests: [],
      currentRequest: 0,
      showModal: false
    };
  }

  fetchNotificationAddresses(webId) {
    let inboxStore = rdf.graph();
    let inboxFetcher = new rdf.Fetcher(inboxStore);

    let inboxAddress = webId.replace("profile/card#me", "inbox");

    inboxFetcher.load(inboxAddress).then(response => {
      const notificationAddresses = inboxStore.each(
        rdf.sym(inboxAddress),
        LDP("contains")
      );

      notificationAddresses.forEach(notificationAddress => {
        const notificationAddressValue =
          inboxAddress + "/" + notificationAddress.value.split("/")[3];
        this.fetchNotification(notificationAddressValue);
      });
    });
  }

  evaluateRisks(risks) {
    var result = true;
    risks.forEach(risk => {
      if (risk === "") {
        result = false;
      }
    });
    return result;
  }

  fetchNotification(notificationAddress) {
    let notificationStore = rdf.graph();
    let notificationFetcher = new rdf.Fetcher(notificationStore);

    notificationFetcher.load(notificationAddress).then(response => {
      const sender = notificationStore.any(
        rdf.sym(notificationAddress),
        PREQ("requestFrom")
      );

      if (!sender) {
        return;
      }

      const requestType = notificationStore.any(
        rdf.sym(notificationAddress),
        PREQ("requestDataType")
      );
      const requestTypeValue = requestType.value.split("#")[1];

      const requestedRessource = notificationStore.any(
        rdf.sym(notificationAddress),
        PREQ("requests")
      );
      const requestedRessourceValue = requestedRessource.value;

      const created = notificationStore.any(
        rdf.sym(notificationAddress),
        PREQ("wasSentOn")
      );
      const createdValue = created ? created.value : "";

      const expires = notificationStore.any(
        rdf.sym(notificationAddress),
        PREQ("expires")
      );
      const expiresValue = expires ? expires.value : "";

      const requestStatus = notificationStore.any(
        rdf.sym(notificationAddress),
        PREQ("hasStatus")
      );
      const requestStatusValue = requestStatus ? requestStatus.value : "";

      const privacyRisk = notificationStore.any(
        rdf.sym(notificationAddress),
        PREQ("privacyRisklevel")
      );
      const privacyRiskValue = privacyRisk ? privacyRisk.value : "";

      const financialRisk = notificationStore.any(
        rdf.sym(notificationAddress),
        PREQ("financialRisklevel")
      );
      const financialRiskValue = financialRisk ? financialRisk.value : "";

      const legalRisk = notificationStore.any(
        rdf.sym(notificationAddress),
        PREQ("legalRisklevel")
      );
      const legalRiskValue = legalRisk ? legalRisk.value : "";

      const risks = [privacyRiskValue, financialRiskValue, legalRiskValue];
      const riskEvaluation = this.evaluateRisks(risks);

      const requestIntent = notificationStore.any(
        rdf.sym(notificationAddress),
        PREQ("hasIntent")
      );
      const requestIntentValue = requestIntent
        ? requestIntent.value.split("#")[1]
        : "";

      if (!requestIntentValue) {
        return;
      }

      const identityEvaluation = sender.value.includes("profile/card#me");

      this.addRequest([
        sender.value,
        sender.value,
        "",
        ["Access " + requestTypeValue + " (" + requestedRessourceValue + ")"],
        requestedRessourceValue,
        notificationAddress,
        requestTypeValue,
        requestIntentValue,
        [privacyRiskValue, financialRiskValue, legalRiskValue],
        riskEvaluation,
        identityEvaluation,
        requestStatusValue,
        createdValue,
        expiresValue
      ]);
    });
  }

  acceptRequest(e) {
    const file = e.target.id;
    console.log(file);
    const sender = e.target.getAttribute("sender");
    const notification = e.target.getAttribute("notification");
    const aclFile = file + ".acl";
    const ownerNode = aclFile + "#owner";
    const viewerNode = aclFile + "#viewer";
    console.log(ownerNode);

    const accessStore = rdf.graph();
    const accessFetcher = new rdf.Fetcher(accessStore);
    const accessUpdater = new rdf.UpdateManager(accessStore);

    accessFetcher
      .load(aclFile)
      .then(response => {
        const delACL = [];
        const insACL = [
          rdf.st(
            rdf.sym(viewerNode),
            ACL("agent"),
            rdf.sym(sender),
            rdf.sym(viewerNode).doc()
          )
        ];

        accessUpdater.update(delACL, insACL, (uri, ok, message) => {
          if (!ok) console.log(message);
          else console.log("Added .acl triples");
        });
      })
      .catch(err => {
        const newACLTriples = [
          rdf.st(
            rdf.sym(ownerNode),
            ACL("agent"),
            rdf.sym(this.state.webId),
            rdf.sym(ownerNode).doc()
          ),
          rdf.st(
            rdf.sym(ownerNode),
            ACL("accessTo"),
            rdf.sym(file),
            rdf.sym(ownerNode).doc()
          ),
          rdf.st(
            rdf.sym(ownerNode),
            ACL("defaultForNew"),
            rdf.sym(file),
            rdf.sym(ownerNode).doc()
          ),
          rdf.st(
            rdf.sym(ownerNode),
            ACL("mode"),
            ACL("Control"),
            rdf.sym(ownerNode).doc()
          ),
          rdf.st(
            rdf.sym(ownerNode),
            ACL("mode"),
            ACL("Read"),
            rdf.sym(ownerNode).doc()
          ),
          rdf.st(
            rdf.sym(ownerNode),
            ACL("mode"),
            ACL("Write"),
            rdf.sym(ownerNode).doc()
          ),
          rdf.st(
            rdf.sym(viewerNode),
            ACL("agent"),
            rdf.sym(sender),
            rdf.sym(viewerNode).doc()
          ),
          rdf.st(
            rdf.sym(viewerNode),
            ACL("accessTo"),
            rdf.sym(file),
            rdf.sym(viewerNode).doc()
          ),
          rdf.st(
            rdf.sym(viewerNode),
            ACL("defaultForNew"),
            rdf.sym(file),
            rdf.sym(viewerNode).doc()
          ),
          rdf.st(
            rdf.sym(viewerNode),
            ACL("mode"),
            ACL("Read"),
            rdf.sym(viewerNode).doc()
          )
        ];

        accessUpdater.put(
          rdf.sym(aclFile),
          newACLTriples,
          "text/turtle",
          (uri, ok, message) => {
            if (!ok) console.log(message);
            else console.log("Added .acl triples");
          }
        );
      });

    const delNotif = [
      rdf.st(
        rdf.sym(notification),
        PREQ("hasStatus"),
        rdf.lit(""),
        rdf.sym(notification).doc()
      )
    ];
    const insNotif = [
      rdf.st(
        rdf.sym(notification),
        PREQ("hasStatus"),
        rdf.lit("Accepted"),
        rdf.sym(notification).doc()
      )
    ];
    accessUpdater.update(delNotif, insNotif, (uri, ok, message) => {
      if (!ok) console.log(message);
      else console.log("Added Accepted triple"); window.location = "https://a-solid-web.github.io/profile-viewer-react/";
    });
  }

  denyRequest(e) {
    const notification = e.target.getAttribute("notification");

    const accessStore = rdf.graph();
    const accessFetcher = new rdf.Fetcher(accessStore);
    const accessUpdater = new rdf.UpdateManager(accessStore);

    const del = [
      rdf.st(
        rdf.sym(notification),
        PREQ("hasStatus"),
        rdf.lit(""),
        rdf.sym(notification).doc()
      )
    ];
    const ins = [
      rdf.st(
        rdf.sym(notification),
        PREQ("hasStatus"),
        rdf.lit("Denied"),
        rdf.sym(notification).doc()
      )
    ];

    accessUpdater.update(del, ins, (uri, ok, message) => {
      if (!ok) alert(message);
      else window.location = "https://a-solid-web.github.io/profile-viewer-react/";
    });
  }

  revokeRequest(e) {
    const notification = e.target.getAttribute("notification");
    const sender = e.target.getAttribute("sender");
    const aclFile = e.target.id + ".acl";
    const viewerNode = aclFile + "#viewer";

    const accessStore = rdf.graph();
    const accessFetcher = new rdf.Fetcher(accessStore);
    const accessUpdater = new rdf.UpdateManager(accessStore);

    const del = [
      rdf.st(
        rdf.sym(viewerNode),
        ACL("agent"),
        rdf.sym(sender),
        rdf.sym(viewerNode).doc()
      )
    ];
    const ins = [];

    accessUpdater.update(del, ins, (uri, ok, message) => {
      if (!ok) console.log(message);
      else console.log("Revoked access in .acl file");
    });

    const delStatus = [
      rdf.st(
        rdf.sym(notification),
        PREQ("hasStatus"),
        rdf.lit("Accepted"),
        rdf.sym(notification).doc()
      )
    ];

    const insStatus = [
      rdf.st(
        rdf.sym(notification),
        PREQ("hasStatus"),
        rdf.lit(""),
        rdf.sym(notification).doc()
      )
    ];

    accessUpdater.update(delStatus, insStatus, (uri, ok, message) => {
      if (!ok) alert(message);
      else window.location = "https://a-solid-web.github.io/profile-viewer-react/";
    });
  }

  addNotification(name, sender, picture, requestType) {
    const requests = this.state.requests;
    requests.push();
    return;
  }

  addRequest(newRequest) {
    const requests = this.state.requests.slice();
    requests.push(newRequest);
    this.setState({ requests: requests });
  }

  removeRequest(input) {
    if (input === parseInt(input, 10)) {
      const requests = this.state.requests.slice();
      requests.splice(input, 1);
      this.setState({ requests: requests });
    } else {
      const requests = this.state.requests.slice();
      const filteredRequests = requests.filter((value, index, arr) => {
        return value !== input;
      });
      this.setState({ requests: filteredRequests });
    }
  }

  toggleModal(e) {
    if (!this.state.showModal) {
      this.setState({
        showModal: !this.state.showModal,
        currentRequest: e.target.getAttribute("index")
      });
    }
    this.setState({
      showModal: !this.state.showModal
    });
  }

  getRequests() {
    if (this.state.requests.length === 0) {
      return (
        <div className="requestcard-request">
          Looks like you don't have any requests at the moment
        </div>
      );
    } else {
      const requests = this.state.requests;
      return requests.map((item, i) => {
        return item[11] !== "Denied" ? (
          <RequestCard
            key={i}
            index={i}
            request={item}
            onToggle={this.toggleModal.bind(this)}
            onAccept={this.acceptRequest.bind(this)}
            onDeny={this.denyRequest.bind(this)}
            onRevoke={this.revokeRequest.bind(this)}
          />
        ) : (
          ""
        );
      });
    }
  }

  componentDidMount() {
    auth.trackSession(session => {
      if (!session) {
        console.log("You are not logged in...");
      } else {
        this.setState({
          webId: session.webId
        });
      }

      this.fetchNotificationAddresses(this.state.webId);
    });
  }

  render() {
    const requests = this.getRequests();
    return (
      <div
        className="grid-container"
        addrequest={this.addRequest}
        removerequest={this.removeRequest}
      >
        <div id="toggle">
          <div>Requests</div>
          <div>Activity</div>
        </div>
        <div className="requestcards">{requests}</div>
        {this.state.requests[this.state.currentRequest] ? (
          <DetailModal
            show={this.state.showModal}
            onHide={this.toggleModal.bind(this)}
            request={this.state.requests[this.state.currentRequest]}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default OverviewPage;
