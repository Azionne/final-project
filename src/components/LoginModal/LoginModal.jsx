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
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

  useEffect(() => {
    if (activeModal === "sign-in") {
      setEmail("");
      setPassword("");
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
      buttonText={isSaving ? "Signing In..." : "Sign in"}
      activeModal={activeModal}
      modalName="sign-in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      contentClassName="login-modal__content"
      formClassname="login-modal__form"
      buttonPosition="bottom"
    >
      <label className="login-modal__label">
        Email *
        <input
          type="email"
          className="login-modal__input"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter email"
          required
        />
        {emailError && (
          <span className="register-modal__error-email">{emailError}</span>
        )}
      </label>

      <label className="login-modal__label">
        Password *
        <input
          type="password"
          className="login-modal__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
      </label>

      {loginError && !emailError && (
        <p className="login-modal__error">{loginError}</p>
      )}

      <button
        type="button"
        className="login-modal__switch-button"
        onClick={switchToRegister}
        style={{ order: 2 }}
      >
        or Sign up
      </button>
    </ModalWithForm>
  );
}
