import React, { useEffect } from "react";
import "./modalWithForm.css";

export function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  contentClassName = "",
  formClassname = "",
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
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
      // Add class to body to hide hamburger
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`modal ${isOpen ? "modal--opened" : ""} ${contentClassName}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 id="modal-title" className="modal__title">
            {title}
          </h2>
          <button
            className="modal__close-button"
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <span className="modal__close-icon"></span>
          </button>
        </div>

        <form onSubmit={onSubmit} className={`modal__form ${formClassname}`}>
          {buttonPosition === "top" && (
            <button type="submit" className="modal__submit-button">
              {buttonText}
            </button>
          )}

          <div className="modal__form-content">{children}</div>

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
