import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentChat } from "../../../../store/actions/chat";
import Friend from "../Friend/Friend";
import Modal from "../../../Modal/Modal";
import ChatService from "../../../../services/chatService";

import "./FriendList.scss";

const FriendList = () => {
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chatReducer.chats);
  const socket = useSelector((state) => state.chatReducer.socket);

  const openChat = (chat) => {
    dispatch(setCurrentChat(chat));
  };

  const searchFriends = (e) => {
    ChatService.searchUsers(e.target.value).then((res) => setSuggestions(res));
  };

  const addNewFriend = (id) => {
    // dispatch
    ChatService.createChat(id)
      .then((chats) => {
        socket.emit("add-friend", chats);
        setShowFriendsModal(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="friends" className="shadow-light">
      <div id="title">
        <h3 className="m-0">Friends</h3>
        <button onClick={() => setShowFriendsModal(true)}>ADD</button>
      </div>
      <hr />
      <div id="friends-box">
        {chats.length > 0 ? (
          chats.map((chat) => {
            return (
              <Friend chat={chat} key={chat.id} click={() => openChat(chat)} />
            );
          })
        ) : (
          <p id="no-chat">No friends added</p>
        )}
      </div>
      {showFriendsModal && (
        <Modal closeModalHandler={() => setShowFriendsModal(false)}>
          <Fragment key="header" />
          <h3 className="m-0">Create new chat</h3>
          <Fragment />

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
    </div>
  );
};

export default FriendList;
