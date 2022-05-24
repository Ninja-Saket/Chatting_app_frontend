import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./Chat.scss";
const Chat = () => {
  return (
    <div id="chat-container">
      <Navbar />
      <div id="char-wrap">Data</div>
    </div>
  );
};

export default Chat;
