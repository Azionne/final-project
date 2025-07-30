import React, { useState, useEffect } from "react";
import "./modalWithForm.css";

export function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  contentClassName = "",
  buttonPosition = "bottom", // "top" or "bottom"
}) {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);
  return (
    <div
      className={`modal${isOpen ? " modal_opened" : ""}${
        contentClassName ? " " + contentClassName : ""
      }`}
      onClick={onClose}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {buttonPosition === "top" && (
            <button type="submit" className="modal__submit-button">
              {buttonText}
            </button>
          )}
          {children}
          {buttonPosition === "bottom" && (
            <button type="submit" className="modal__submit-button">
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
