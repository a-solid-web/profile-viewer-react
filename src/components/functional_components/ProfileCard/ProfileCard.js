import React from "react";
import "./ProfileCard.css";
import { Button } from "yoda-design-system";

const ProfileCard = props => {
  const editing = props.editing;
  const content = props.content;
  const type = content.type;
  const information = content.information;

  return (
    <div className="profileCard">
      {information.map(item => {
        return (
          <div
            className="profileCard-information"
            onClick={() => {
              console.log(item.name);
            }}
          >
            <div className="profileCard-information-name">{item.name}</div>
            <div className="profileCard-information-content">
              {item.content}
            </div>
          </div>
        );
      })}
      {editing ? <Button variant="outlined">add {type}</Button> : null}
    </div>
  );
};

export default ProfileCard;
