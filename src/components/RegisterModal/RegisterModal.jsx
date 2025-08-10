import React, { useState, useEffect } from "react";
import "../RegisterModal/registerModal.css";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";

export default function RegisterModal(props) {
  const {
    onClose,
    activeModal,
    isSaving,
    onRegister,
    switchToLogin,
    registrationError,
  } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  //const [isFormValid, setisFormValid] =useState ("");
  //const [errors, setErrors] =useState ("");

  const isOpen = activeModal === "sign-up";

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

  useEffect(() => {
    if (activeModal === "sign-up") {
      setEmail("");
      setPassword("");
      setName("");
    }
  }, [activeModal]);

  const validateEmail = (value) => {
    // Simple email regex for demonstration
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
    // Validate email before submitting
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }
    setEmailError("");
    onRegister({ email, password, name });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="" // Empty since we're manually adding the button
      activeModal={activeModal}
      modalName="sign-up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      contentClassName="register-modal__content"
      formClassname="register-modal__form"
      buttonPosition="none" // Don't auto-add button
    >
      <label className="register-modal__label">
        Name
        <input
          type="text"
          className="register-modal__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </label>
      <label className="register-modal__label">
        Email
        <input
          type="email"
          className="register-modal__input"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter email"
          required
        />
        {emailError && (
          <span className="register-modal__error-email">{emailError}</span>
        )}
      </label>
      <label className="register-modal__label">
        Password
        <input
          type="password"
          className="register-modal__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
      </label>
      {registrationError && !emailError && (
        <p className="register-modal__error">{registrationError}</p>
      )}
      <button type="submit" className="modal__submit-button">
        {isSaving ? "Registering..." : "Sign up"}
      </button>
      <button
        type="button"
        className="register-modal__switch-button"
        onClick={switchToLogin}
      >
        or Sign in
      </button>
    </ModalWithForm>
  );
}
