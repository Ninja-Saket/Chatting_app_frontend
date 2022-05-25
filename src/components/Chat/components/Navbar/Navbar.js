import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../../../../store/actions/auth";
import Modal from "../../../Modal/Modal";
import "./Navbar.scss";
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  return (
    <div id="navbar" className="card-shadow">
      <h2>Chat.io</h2>
      <div
        id="profile-menu"
        onClick={() => setShowProfileOptions(!showProfileOptions)}
      >
        <img width="40" height="40" src={user.avatar} alt="Avatar" />
        <p>
          {user.firstName} {user.lastName}
        </p>
        <FontAwesomeIcon icon="caret-down" className="fa-icon" />

        {showProfileOptions && (
          <div id="profile-options">
            <p>Update profile</p>
            <p onClick={() => dispatch(logout())}>Logout</p>
          </div>
        )}

        {
          <Modal>
            <Fragment key="header">Modal Header</Fragment>
            <Fragment key="body">Modal Body</Fragment>
            <Fragment key="footer">Modal Footer</Fragment>
          </Modal>
        }
      </div>
    </div>
  );
};

export default Navbar;
