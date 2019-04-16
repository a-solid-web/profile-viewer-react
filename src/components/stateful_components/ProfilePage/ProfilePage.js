import React from "react";
import "./ProfilePage.css";
import ProfileCard from "../../functional_components/ProfileCard";
import ProfilePermissionInterface from "../../functional_components/ProfilePermissionInterface";
import { Button } from "yoda-design-system";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.setPermissionInterface = this.setPermissionInterface.bind(this);
    this.state = {
      webid: "#",
      editing: false,
      profileCardInformation: [
        {
          type: "date",
          information: [{ name: "Birthday", content: "17 August 2000" }]
        },
        {
          type: "address",
          information: [
            {
              name: "Berlin",
              content: "Bornholmer Straße 17 10439 Berlin Germany"
            },
            {
              name: "Beach house ayy",
              content: "Tarkhnishvili 21 0109 Tbilisi Georgia"
            }
          ]
        },
        {
          type: "phone number",
          information: [
            { name: "Personal", content: "+49 162 877 4024" },
            { name: "work", content: "+49 152 421 0529" },
            { name: "tbilisi", content: "+995 595 45 50 10" }
          ]
        },
        {
          type: "email address",
          information: [
            { name: "personal", content: "irakli.goder@gmail.com" },
            { name: "Uni", content: "irakli.goderdzishvili@code.berlin" },
            { name: "work", content: "irakli@myo.de" }
          ]
        }
      ],
      activeInformation: "Select an information to edit"
    };
  }

  toggleEditing() {
    const editingState = this.state.editing;
    this.setState({ editing: !editingState });
  }

  setPermissionInterface(value) {
    this.setState({ activeInformation: value });
  }

  getProfileCards() {
    const profileCardInformation = this.state.profileCardInformation;
    return profileCardInformation.map((item, index) => {
      return (
        <ProfileCard
          key={index}
          content={item}
          editing={this.state.editing}
          onClick={this.setPermissionInterface}
        />
      );
    });
  }

  render() {
    const profileCards = this.getProfileCards();

    return (
      <div className="grid-container">
        <div className="profileInformation">
          <div className="profileInformation-header">
            <img
              className="profileInformation-header-avatar"
              src="https://via.placeholder.com/60"
              alt="avatar"
            />
            <div className="profileInformation-header-user">
              <div className="profileInformation-header-user-name">
                Irakli Goderdzishvili
              </div>
              <div className="profileInformation-header-user-webid">
                <a href={this.state.webid}>@irakli</a>
              </div>
            </div>
            <Button
              className="profileInformation-header-edit"
              onClick={this.toggleEditing}
            >
              {this.state.editing ? "Finish editing" : "Edit profile"}
            </Button>
          </div>
          {profileCards}
          {this.state.editing ? (
            <Button
              className="profileInformation-addCategory"
              variant="outlined"
            >
              Add category
            </Button>
          ) : null}
        </div>
        <div className="permissionInterface">
          <ProfilePermissionInterface
            information={this.state.activeInformation}
          />
        </div>
      </div>
    );
  }
}

export default ProfilePage;
