import React from "react";
import "./ProfileCard.css";
import { Button } from "yoda-design-system";

const ProfileCard = props => {
  const editing = props.editing;
  const content = props.content;
  const type = content.type;
  const information = content.information;

  return (
    <div
      className={editing ? "profileCard profileCard--editing" : "profileCard"}
    >
      {information.map((item, index) => {
        return (
          <div
            key={index}
            className="profileCard-information"
            onClick={() => {
              props.onClick(item.name + " " + type);
            }}
          >
            <div className="profileCard-information-name">{item.name}</div>
            <div className="profileCard-information-content">
              {item.content}
            </div>
            {editing ? <Button variant="outlined">Delete</Button> : null}
          </div>
        );
      })}
      {editing ? <Button variant="outlined">{"add " + type}</Button> : null}
    </div>
  );
};

export default ProfileCard;
