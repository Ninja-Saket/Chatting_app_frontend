import React from "react";
import "./Friend.scss";

const Friend = ({ chat }) => {
  return (
    <p>
      {chat.Users[0].firstName} {chat.Users[0].lastName}
    </p>
  );
};

export default Friend;
