import "./header.css";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logoutIcon from "../../assets/logout.svg";
import closeIcon from "../../assets/close.svg";

function Header({
  isLoggedIn,
  onSignInClick,
  onSignUpClick,
  onLogout,
  userName,
  theme = "dark",
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 599);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header header--${theme}`}>
      <div className="header__container">
        <NavLink to="/" className="header__logo">
          NewsExplorer
        </NavLink>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="header__navigation">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    "header__nav-link header__nav-link-underline" +
                    (isActive ? " active" : "")
                  }
                >
                  Home
                </NavLink>
              </li>
              {isLoggedIn && (
                <li className="header__nav-item">
                  <NavLink
                    to="/saved-news"
                    className={({ isActive }) =>
                      "header__nav-link header__nav-link-underline header__nav-link--saved" +
                      (isActive ? " active" : "")
                    }
                  >
                    Saved articles
                  </NavLink>
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
                <button
                  className="header__login-button"
                  onClick={onSignInClick}
                >
                  Sign in
                </button>
              )}
            </div>
          </nav>
        )}

        {/* Mobile Hamburger Button */}
        {isMobile && (
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
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div className="header__mobile-overlay" onClick={closeMobileMenu}>
          <div
            className={`header__mobile-menu${
              isSavedNewsPage ? " header__mobile-menu--saved" : ""
            }`}
          >
            <div
              className={`header__mobile-header${
                isSavedNewsPage ? " header__mobile-header--saved" : ""
              }`}
            >
              <NavLink
                to="/"
                className="header__logo header__logo--mobile"
                onClick={closeMobileMenu}
              >
                NewsExplorer
              </NavLink>
              <button
                className={`header__close-button${
                  isSavedNewsPage ? " header__close-button--saved" : ""
                }`}
                aria-label="Close menu"
                onClick={closeMobileMenu}
              >
                <img src={closeIcon} alt="Close" width={28} height={28} />
              </button>
            </div>

            <nav
              className="header__mobile-navigation"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="header__mobile-nav-list">
                <li className="header__mobile-nav-item">
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      "header__mobile-nav-link" + (isActive ? " active" : "")
                    }
                    onClick={closeMobileMenu}
                  >
                    Home
                  </NavLink>
                </li>
                {isLoggedIn && (
                  <li className="header__mobile-nav-item">
                    <NavLink
                      to="/saved-news"
                      className={({ isActive }) =>
                        "header__mobile-nav-link header__mobile-nav-link--saved" +
                        (isActive ? " active" : "")
                      }
                      onClick={closeMobileMenu}
                    >
                      Saved articles
                    </NavLink>
                  </li>
                )}
              </ul>

              <button
                className={`header__mobile-action-button${
                  isLoggedIn
                    ? " header__mobile-action-button--signed-in"
                    : " header__mobile-action-button--not-signed-in"
                }`}
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
