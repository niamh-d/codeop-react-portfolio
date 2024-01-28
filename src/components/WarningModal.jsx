import React from "react";

const WarningModal = ({
  heading = "Are you sure?",
  textBtnPrimary = "Cancel",
  textBtnSecondary,
  onClickHandler,
  modalId,
}) => {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{heading}</h3>
        <p className="py-4">
          This is a destructive action and cannot be undone.
        </p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-ghost" onClick={onClickHandler}>
              {textBtnSecondary}
            </button>
            <button className="ml-2 btn btn-primary">{textBtnPrimary}</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default WarningModal;
