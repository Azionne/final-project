import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Main } from "../Main/Main.jsx";
import { About } from "../About/About.jsx";
import { Footer } from "../Footer/Footer.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal.jsx";
import { searchNews } from "../../utils/newsApi.js";

function App() {
  // State variables - like having all your remote controls ready!
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [registeredName, setRegisteredName] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [loginError, setLoginError] = useState("");

  // News search states
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [lastSearchKeyword, setLastSearchKeyword] = useState("");

  // Modal control functions - like remote control buttons!
  const closeActiveModal = () => {
    setActiveModal("");
    setRegistrationError(""); // Clear errors when closing
    setLoginError(""); // Clear login errors too
  };

  const switchToLoginModal = () => {
    setActiveModal("sign-in");
    setRegistrationError(""); // Clear errors when switching
    setLoginError(""); // Clear login errors too
  };

  const switchToRegisterModal = () => {
    setActiveModal("sign-up");
    setRegistrationError(""); // Clear errors when switching
    setLoginError(""); // Clear login errors too
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    closeActiveModal();
  };

  const handleLogin = ({ email, password }) => {
    setIsSaving(true);
    setLoginError("");

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoginError("Invalid email address.");
      setIsSaving(false);
      return;
    }

    // Simulate API call for now
    setTimeout(() => {
      console.log("Login attempt:", { email, password });

      // Simulate successful login
      setIsLoggedIn(true);
      setUserName(registeredName || ""); // Use registered name if available
      closeActiveModal();
      setIsSaving(false);
    }, 1000);
  };

  const handleRegisterClick = ({ name, avatar, email, password }) => {
    setIsSaving(true);
    setRegistrationError("");

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setRegistrationError("Invalid email address.");
      setIsSaving(false);
      return;
    }

    // Simulate API call for now
    setTimeout(() => {
      console.log("Registration attempt:", { name, avatar, email, password });

      // Simulate unavailable email (e.g., 'taken@example.com')
      if (email === "taken@example.com") {
        setRegistrationError("This email is not available.");
        setIsSaving(false);
        return;
      }

      setRegisteredName(name); // Store the registered name
      // Show success modal instead of logging in immediately
      setActiveModal("registration-success");
      setIsSaving(false);
    }, 1000);
  };

  // News search function
  const handleSearch = (query) => {
    setIsLoading(true);
    setSearchError("");
    setHasSearched(true);
    setLastSearchKeyword(query);

    searchNews(query)
      .then((searchResults) => {
        setArticles(searchResults);
        setSearchError("");
      })
      .catch((error) => {
        console.error("Search error:", error);
        setSearchError(
          "Sorry, something went wrong during the request. Please try again later."
        );
        setArticles([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Save article function
  const handleSaveArticle = (article, keyword) => {
    if (!isLoggedIn) {
      return;
    }

    // Check if article is already saved
    const isAlreadySaved = savedArticles.some(
      (saved) => saved.url === article.url
    );

    if (isAlreadySaved) {
      // Remove from saved articles
      setSavedArticles((prev) =>
        prev.filter((saved) => saved.url !== article.url)
      );
    } else {
      // Add to saved articles, include keyword if provided
      setSavedArticles((prev) => [
        ...prev,
        keyword ? { ...article, keyword } : article,
      ]);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main
                isLoggedIn={isLoggedIn}
                userName={userName}
                onSignInClick={switchToLoginModal}
                onSignUpClick={switchToRegisterModal}
                onLogout={handleLogout}
                onSearch={handleSearch}
                articles={articles}
                isLoading={isLoading}
                searchError={searchError}
                hasSearched={hasSearched}
                savedArticles={savedArticles}
                onSaveArticle={(article) =>
                  handleSaveArticle(article, lastSearchKeyword)
                }
              />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-news"
          element={
            <>
              <SavedNews
                isLoggedIn={isLoggedIn}
                userName={userName}
                onSignInClick={switchToLoginModal}
                onSignUpClick={switchToRegisterModal}
                onLogout={handleLogout}
                savedArticles={savedArticles}
                onSaveArticle={handleSaveArticle}
              />
              <Footer />
            </>
          }
        />
      </Routes>

      {/* Modals remain outside of Routes so they work on all pages */}
      <RegisterModal
        isOpen={activeModal === "sign-up"}
        switchToLogin={switchToLoginModal}
        activeModal={activeModal}
        onClose={closeActiveModal}
        onRegister={handleRegisterClick}
        isSaving={isSaving}
        setActiveModal={setActiveModal}
        registrationError={registrationError}
      />
      <LoginModal
        isOpen={activeModal === "sign-in"}
        switchToRegister={() => setActiveModal("sign-up")}
        activeModal={activeModal}
        onClose={closeActiveModal}
        onLogin={handleLogin}
        isSaving={isSaving}
        loginError={loginError}
      />
      <RegistrationSuccessModal
        isOpen={activeModal === "registration-success"}
        onClose={closeActiveModal}
        onSwitchToLogin={switchToLoginModal}
      />
    </Router>
  );
}

export default App;
