import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header.jsx";
import { Main } from "../Main/Main.jsx";
import { Footer } from "../Footer/Footer.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal.jsx";
import { searchNews } from "../../utils/newsApi.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [registeredName, setRegisteredName] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [loginError, setLoginError] = useState("");

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [lastSearchKeyword, setLastSearchKeyword] = useState("");

  const closeActiveModal = () => {
    setActiveModal("");
    setRegistrationError("");
    setLoginError("");
  };

  const switchToLoginModal = () => {
    setActiveModal("sign-in");
    setRegistrationError("");
    setLoginError("");
  };

  const switchToRegisterModal = () => {
    setActiveModal("sign-up");
    setRegistrationError("");
    setLoginError("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    closeActiveModal();
  };

  const handleLogin = ({ email, password }) => {
    setIsSaving(true);
    setLoginError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoginError("Invalid email address.");
      setIsSaving(false);
      return;
    }

    setTimeout(() => {
      console.log("Login attempt:", { email, password });

      setIsLoggedIn(true);
      setUserName(registeredName || "");
      closeActiveModal();
      setIsSaving(false);
    }, 1000);
  };

  const handleRegisterClick = ({ name, avatar, email, password }) => {
    setIsSaving(true);
    setRegistrationError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setRegistrationError("Invalid email address.");
      setIsSaving(false);
      return;
    }

    setTimeout(() => {
      console.log("Registration attempt:", { name, avatar, email, password });

      if (email === "taken@example.com") {
        setRegistrationError("This email is not available.");
        setIsSaving(false);
        return;
      }

      setRegisteredName(name);
      setUserName(name); // <-- add this line
      setActiveModal("registration-success");
      setIsSaving(false);
    }, 1000);
  };

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

  const handleSaveArticle = (article, keyword) => {
    if (!isLoggedIn) {
      return;
    }

    const isAlreadySaved = savedArticles.some(
      (saved) => saved.url === article.url
    );

    if (isAlreadySaved) {
      setSavedArticles((prev) =>
        prev.filter((saved) => saved.url !== article.url)
      );
    } else {
      setSavedArticles((prev) => [
        ...prev,
        keyword ? { ...article, keyword } : article,
      ]);
    }
  };

  return (
    <Router>
      <div className="app">
        <Header
          isLoggedIn={isLoggedIn}
          userName={userName}
          onSignInClick={switchToLoginModal}
          onSignUpClick={switchToRegisterModal}
          onLogout={handleLogout}
        />

        <Routes>
          <Route
            path="/"
            element={
              <main className="app__main">
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
              </main>
            }
          />
          <Route
            path="/saved-news"
            element={
              <main className="app__main">
                <SavedNews
                  isLoggedIn={isLoggedIn}
                  userName={userName}
                  onSignInClick={switchToLoginModal}
                  onSignUpClick={switchToRegisterModal}
                  onLogout={handleLogout}
                  savedArticles={savedArticles}
                  onSaveArticle={handleSaveArticle}
                />
              </main>
            }
          />
        </Routes>

        <Footer />

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
      </div>
    </Router>
  );
}
export default App;
