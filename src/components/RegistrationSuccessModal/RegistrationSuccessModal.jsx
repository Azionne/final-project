import React from "react";
import "./registrationSuccessModal.css";
import closeIcon from "../../assets/close.svg";

export default function RegistrationSuccessModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}) {
  return (
    <div className={`modal${isOpen ? " modal_opened" : ""}`} onClick={onClose}>
      <div
        className="modal__content registration-success__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="close icon" />
        </button>
        <div className="registration-success__body">
          <h2 className="registration-success__title">
            <span className="registration-success__title-main">
              Registration successfully
            </span>
            <span className="registration-success__title-completed">
              completed!
            </span>
          </h2>
          <button
            type="button"
            className="registration-success__signin-button"
            onClick={onSwitchToLogin}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
