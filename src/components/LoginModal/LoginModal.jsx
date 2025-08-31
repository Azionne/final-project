import React, { useState, useEffect } from "react";
import "./loginModal.css";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";

export default function LoginModal(props) {
  const {
    onClose,
    activeModal,
    isSaving,
    onLogin,
    switchToRegister,
    loginError,
  } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const isOpen = activeModal === "sign-in";

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setEmailError("");
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

  useEffect(() => {
    if (activeModal === "sign-in") {
      setEmail("");
      setPassword("");
      setEmailError("");
    }
  }, [activeModal]);

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }
    setEmailError("");
    onLogin({ email, password });
  };

  return (
    <ModalWithForm
      title="Sign in"
      buttonText="" // Not used
      activeModal={activeModal}
      modalName="sign-in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      contentClassName="login-modal__content"
      formClassName="login-modal__form" // <-- Fix here
      buttonPosition="none"
    >
      <div className="login-modal__form-section">
        <label htmlFor="login-email" className="login-modal__label">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          className={`login-modal__input ${
            emailError ? "login-modal__input--error" : ""
          }`}
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter email"
          required
          aria-describedby={emailError ? "login-email-error" : undefined}
        />
        {emailError && (
          <span
            id="login-email-error"
            className="login-modal__error-message"
            role="alert"
          >
            {emailError}
          </span>
        )}
      </div>

      <div className="login-modal__form-section">
        <label htmlFor="login-password" className="login-modal__label">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          className="login-modal__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
      </div>

      {loginError && !emailError && (
        <div className="login-modal__error" role="alert">
          {loginError}
        </div>
      )}

      <button
        type="submit"
        className="modal__submit-button"
        disabled={isSaving}
      >
        {isSaving ? "Signing In..." : "Sign in"}
      </button>
      <button
        type="button"
        className="login-modal__switch-button"
        onClick={switchToRegister}
      >
        or Sign up
      </button>
    </ModalWithForm>
  );
}
