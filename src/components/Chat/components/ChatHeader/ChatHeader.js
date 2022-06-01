import React, { Fragment, useEffect, useState } from "react";
import { userStatus } from "../../../../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import ChatService from "../../../../services/chatService";
import Modal from "../../../Modal/Modal";
import "./ChatHeader.scss";

const ChatHeader = ({ chat }) => {
  const [suggestions, setSuggestions] = useState([]);
  const socket = useSelector((state) => state.chatReducer.socket);
  const current = useSelector((state) => state.chatReducer.currentChat);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [showLeaveChatModal, setShowLeaveChatModal] = useState(false);
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);
  const [chatType, setChatType] = useState("dual");

  const searchFriends = (e) => {
    ChatService.searchUsers(e.target.value).then((res) => setSuggestions(res));
  };

  const addNewFriend = (id) => {
    ChatService.addFriendToGroupChat(id, chat.id)
      .then((data) => {
        setChatType(data.chat.type);
        socket.emit("add-user-to-group", data);
        setShowAddFriendModal(false);
      })
      .catch((err) => console.log(err));
  };

  const leaveChat = () => {
    ChatService.leaveCurrentChat(chat.id)
      .then((data) => {
        setChatType(data.chat.type);
        socket.emit("leave-current-chat", data);
      })
      .catch((err) => console.log(err));
  };

  const deleteChat = () => {
    ChatService.deleteCurrentChat(chat.id)
      .then((data) => {
        socket.emit("delete-chat", data);
      })
      .catch((err) => console.log(err));
  };

  const clickHandler = () => {
    setShowChatOptions(!showChatOptions);
    setChatType(chat.type);
  };

  return (
    <Fragment>
      <div id="chatter">
        {chat.Users.map((user) => {
          return (
            <div className="chatter-info" key={user.id}>
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <div className="chatter-status">
                <span className={`${userStatus(user)}`}></span>
              </div>
            </div>
          );
        })}
      </div>
      <FontAwesomeIcon
        onClick={clickHandler}
        icon={["fas", "ellipsis-v"]}
        className="fa-icon"
      />
      {showChatOptions ? (
        <div id="settings">
          <div onClick={() => setShowAddFriendModal(true)}>
            <FontAwesomeIcon icon={["fas", "user-plus"]} className="fa-icon" />
            <p>Add user to chat</p>
          </div>
          {chatType === "group" ? (
            <div onClick={() => leaveChat()}>
              <FontAwesomeIcon
                icon={["fas", "sign-out-alt"]}
                className="fa-icon"
              />
              <p>Leave Chat</p>
            </div>
          ) : null}
          {chatType === "dual" ? (
            <div onClick={() => deleteChat()}>
              <FontAwesomeIcon icon={["fas", "trash"]} className="fa-icon" />
              <p>Delete Chat</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {showAddFriendModal && (
        <Modal closeModalHandler={() => setShowAddFriendModal(false)}>
          <Fragment key="header">
            <h3 className="m-0">Add friend to group chat</h3>
          </Fragment>

          <Fragment key="body">
            <p>Find friends by typing their name below</p>
            <input
              onInput={(e) => searchFriends(e)}
              type="text"
              placehoder="Search..."
            />
            <div id="suggestions">
              {suggestions.map((user) => {
                return (
                  <div key={user.id} className="suggestion">
                    <p className="m-0">
                      {user.firstName} {user.lastName}
                    </p>
                    <button onClick={() => addNewFriend(user.id)}>ADD</button>
                  </div>
                );
              })}
            </div>
          </Fragment>
        </Modal>
      )}
    </Fragment>
  );
};

export default ChatHeader;
