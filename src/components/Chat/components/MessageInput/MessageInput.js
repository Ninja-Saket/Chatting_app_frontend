import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Picker from "emoji-picker-react";
import ChatService from "../../../../services/chatService";
import "./MessageInput.scss";

const MessageInput = ({ chat }) => {
  const user = useSelector((state) => state.authReducer.user);
  const socket = useSelector((state) => state.chatReducer.socket);

  const fileUpload = useRef();
  const msgInput = useRef();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleMessage = (e) => {
    const value = e.target.value;
    setMessage(value);

    // Notify other users that this user is typing something
    const receiver = {
      chatId: chat.id,
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
    };

    if (value.length === 1) {
      receiver.typing = true;
      socket.emit("typing", receiver);
    }

    if (value.length === 0) {
      receiver.typing = false;
      socket.emit("typing", receiver);
    }
  };

  const handleKeyDown = (e, imageUpload) => {
    if (e.key === "Enter") {
      sendMessage(imageUpload);
    }
  };

  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) return;
    const msg = {
      type: imageUpload ? "image" : "text",
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
      chatId: chat.id,
      message: imageUpload ? imageUpload : message,
    };

    setMessage("");
    setImage("");
    setShowEmojiPicker(false);
    // Send message with sockets
    socket.emit("message", msg);
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("id", chat.id);
    formData.append("image", image);
    ChatService.uploadImage(formData)
      .then((image) => {
        sendMessage(image);
      })
      .catch((err) => console.log(err));
  };

  const selectEmoji = (event, emojiObject) => {
    const startPosition = msgInput.current.selectionStart;
    const endPosition = msgInput.current.selectionEnd;
    const value = msgInput.current.value;
    const emojiLength = emojiObject.emoji.length;
    setMessage(
      value.substring(0, startPosition) +
        emojiObject.emoji +
        value.substring(endPosition, value.length)
    );
    msgInput.current.focus();
    msgInput.current.selectionEnd = endPosition + emojiLength;
  };
  return (
    <div id="input-container">
      <div id="image-upload-container">
        <div></div>
        <div id="image-upload">
          {image.name ? (
            <div id="image-details">
              <p className="m-0">{image.name}</p>
              <FontAwesomeIcon
                onClick={handleImageUpload}
                icon="upload"
                className="fa-icon"
              />
              <FontAwesomeIcon
                onClick={() => setImage("")}
                icon="times"
                className="fa-icon"
              />
            </div>
          ) : null}
          <FontAwesomeIcon
            onClick={() => fileUpload.current.click()}
            icon={["far", "image"]}
            className="fa-icon"
          />
        </div>
      </div>
      <div id="message-input">
        <input
          ref={msgInput}
          value={message}
          type="text"
          placeholder="Message..."
          onChange={(e) => handleMessage(e)}
          onKeyDown={(e) => handleKeyDown(e, false)}
        />
        <FontAwesomeIcon
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          icon={["far", "smile"]}
          className="fa-icon"
        />
      </div>
      <input
        id="chat-image"
        ref={fileUpload}
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      {showEmojiPicker ? (
        <Picker
          onEmojiClick={selectEmoji}
          pickerStyle={{ position: "absolute", bottom: "35px", right: "20px" }}
        />
      ) : null}
    </div>
  );
};

export default MessageInput;
