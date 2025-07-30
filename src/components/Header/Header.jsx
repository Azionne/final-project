import "./header.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/background image.jpg";
import logoutIcon from "../../assets/logout.svg";

function Header({
  isLoggedIn,
  onSignInClick,
  onSignUpClick,
  onLogout,
  userName,
  theme = "dark",
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header header--${theme}`}>
      <div className="header__left">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="header__right header__right--desktop">
        {isLoggedIn ? (
          <>
            <Link to="/" className="header__nav-link">
              Home
            </Link>
            <Link to="/saved-news" className="header__nav-link">
              Saved articles
            </Link>
            <button
              className="header__user-pill"
              onClick={onLogout}
              title="Log out"
            >
              <span className="header__user-name">{userName}</span>
              <img
                src={logoutIcon}
                alt="Log out"
                className="header__logout-icon"
              />
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="header__nav-link">
              Home
            </Link>
            <button className="header__login-button" onClick={onSignInClick}>
              Sign in
            </button>
          </>
        )}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        className={`header__mobile-menu-button ${
          isMobileMenuOpen ? "header__mobile-menu-button--open" : ""
        }`}
        onClick={toggleMobileMenu}
      >
        <span className="header__mobile-menu-line"></span>
        <span className="header__mobile-menu-line"></span>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="header__mobile-menu" onClick={closeMobileMenu}>
          {/* Mobile menu logo top left */}
          <Link
            to="/"
            className="header__logo header__mobile-logo"
            onClick={closeMobileMenu}
          >
            NewsExplorer
          </Link>
          {/* Close X button */}
          <button
            className="header__mobile-close-button"
            onClick={closeMobileMenu}
          >
            <span className="header__mobile-close-line"></span>
            <span className="header__mobile-close-line"></span>
          </button>
          <div
            className="header__mobile-menu-content"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoggedIn ? (
              <>
                <Link
                  to="/"
                  className="header__mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link
                  to="/saved-news"
                  className="header__mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  Saved articles
                </Link>
                <button
                  className="header__mobile-login-button"
                  onClick={() => {
                    onLogout();
                    closeMobileMenu();
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="header__mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <button
                  className="header__mobile-login-button"
                  onClick={() => {
                    onSignInClick();
                    closeMobileMenu();
                  }}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
