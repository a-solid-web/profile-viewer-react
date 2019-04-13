import React from "react";
import rdf from "rdflib";
import auth from "solid-auth-client";
import "./OverviewPage.css";
import RequestCard from "../../functional_components/RequestCard";

const LDP = rdf.Namespace("http://www.w3.org/ns/ldp#");
const ACT = rdf.Namespace("https://www.w3.org/ns/activitystreams#");
const FOAF = rdf.Namespace("http://xmlns.com/foaf/0.1/");
const VCARD = rdf.Namespace("http://www.w3.org/2006/vcard/ns#");
const ACL = rdf.Namespace("http://www.w3.org/ns/auth/acl#");
const RDF = rdf.Namespace("https://www.w3.org/1999/02/22-rdf-syntax-ns#type");
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
      requests: []
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

      const senderStore = rdf.graph();
      const senderFetcher = new rdf.Fetcher(senderStore);

      console.log(sender);
      senderFetcher.load(sender).then(response => {
        const picture = senderStore.any(rdf.sym(sender), VCARD("hasPhoto"));
        const name = senderStore.any(rdf.sym(sender), FOAF("name"));

        this.addRequest([
          name.value,
          sender.value,
          picture.value,
          ["Access " + requestTypeValue + " (" + requestedRessourceValue + ")"],
          requestedRessourceValue,
          notificationAddress
        ]);
      });
    });
  }

  acceptRequest(e) {
    const file = e.target.id;
    const sender = e.target.getAttribute("sender");
    const notification = e.target.getAttribute("notification");
    const aclFile = file + "/.acl";
    const ownerNode = aclFile + "#owner";
    const viewerNode = aclFile + "#viewer";
    console.log(ownerNode)

    const accessStore = rdf.graph();
    const accessFetcher = new rdf.Fetcher(accessStore);
    const accessUpdater = new rdf.UpdateManager(accessStore);

    accessFetcher
      .load(aclFile)
      .then(response => {
        const delACL = [];
        const insACL = [
          rdf.st(
            rdf.sym(
              viewerNode,
              ACL("agent"),
              rdf.sym(sender),
              rdf.sym(viewerNode).doc()
            )
          )
        ];

        accessUpdater.put(delACL, insACL, (uri, ok, message) => {
          console.log("New triples have been added.");
        });

        const delNotif = [];
        const insNotif = [
          rdf.st(
            rdf.sym(
              notification,
              PREQ("hasStatus"),
              rdf.lit("Accepted"),
              rdf.sym(viewerNode).doc()
            )
          )
        ];

        accessUpdater.put(delNotif, insNotif, (uri, ok, message) => {
          console.log("New triples have been added.");
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
            RDF("type"),
            ACL("Authorization"),
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
            rdf.sym(ownerNode),
            RDF("type"),
            ACL("Authorization"),
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
            console.log(
              "New Acl file has been created. New triples have already been added."
            );
          }
        );
      });
  }

  denyRequest(e) {
    const file = e.target.id;
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
        return (
          <RequestCard
            key={i}
            avatar={"https://via.placeholder.com/40?text=profile+picture"}
            request={item}
            onAccept={this.acceptRequest.bind(this)}
            onDeny={this.denyRequest.bind(this)}
          />
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
      </div>
    );
  }
}

export default OverviewPage;
