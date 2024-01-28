import React from "react";

const Modal = ({ heading, messageText, modalId, onClickHandler }) => {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{heading}</h3>
        <p className="py-4 text-lg">{messageText}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-secondary" onClick={onClickHandler}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
