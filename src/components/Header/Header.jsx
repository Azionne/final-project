import "./header.css";
import { useState } from "react";
import { Link } from "react-router-dom";
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
      <div className="header__container">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__navigation">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/" className="header__nav-link">
                Home
              </Link>
            </li>
            {isLoggedIn && (
              <li className="header__nav-item">
                <Link
                  to="/saved-news"
                  className="header__nav-link header__nav-link--saved"
                >
                  Saved articles
                </Link>
              </li>
            )}
          </ul>

          <div className="header__user-section">
            {isLoggedIn ? (
              <button
                className="header__user-button"
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
            ) : (
              <button className="header__login-button" onClick={onSignInClick}>
                Sign in
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className={`header__menu-button ${
            isMobileMenuOpen ? "header__menu-button--open" : ""
          }`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="header__menu-line"></span>
          <span className="header__menu-line"></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="header__mobile-overlay" onClick={closeMobileMenu}>
          <div className="header__mobile-menu">
            <div className="header__mobile-header">
              <Link
                to="/"
                className="header__logo header__logo--mobile"
                onClick={closeMobileMenu}
              >
                NewsExplorer
              </Link>
              <button
                className="header__close-button"
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
              >
                <span className="header__close-line"></span>
                <span className="header__close-line"></span>
              </button>
            </div>

            <nav
              className="header__mobile-navigation"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="header__mobile-nav-list">
                <li className="header__mobile-nav-item">
                  <Link
                    to="/"
                    className="header__mobile-nav-link"
                    onClick={closeMobileMenu}
                  >
                    Home
                  </Link>
                </li>
                {isLoggedIn && (
                  <li className="header__mobile-nav-item">
                    <Link
                      to="/saved-news"
                      className="header__mobile-nav-link header__mobile-nav-link--saved"
                      onClick={closeMobileMenu}
                    >
                      Saved articles
                    </Link>
                  </li>
                )}
              </ul>

              <button
                className="header__mobile-action-button"
                onClick={() => {
                  isLoggedIn ? onLogout() : onSignInClick();
                  closeMobileMenu();
                }}
              >
                {isLoggedIn ? "Sign out" : "Sign in"}
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
