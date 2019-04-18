import React from "react";
import "./ProfilePermissionInterface.css";

const ProfilePermissionInterface = props => {
  const information = props.information;
  return (
    <div className="permissionInterface">
      <div className="permissionInterface-header">
        <div>
          Sharing for <strong>{information}</strong>
        </div>
        <button
          className="permissionInterface-header-closeButton"
          onClick={props.closeMethod}
        >
          X
        </button>
      </div>
      <hr />
    </div>
  );
};

export default ProfilePermissionInterface;
