import React from "react";
import "./Modal.scss";

const Modal = (props) => {
  const findByKey = (name) => {
    return props.children.map((child) => {
      if (child.key === name) {
        return child;
      }
      return null;
    });
  };

  const closeModal = (event) => {
    event.stopPropagation();
    if (event.target.classList.contains("modal-close")) {
      return props.closeModalHandler();
    }
  };

  return (
    <div className="modal-mask modal-close" onClick={closeModal}>
      <div className="modal-wrapper">
        <div className="modal-container">
          <div className="modal-header">{findByKey("header")}</div>
          <div className="modal-body">{findByKey("body")}</div>
          <div className="modal-footer">
            <button className="modal-close" onClick={closeModal}>
              CLOSE
            </button>
            {findByKey("footer")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
