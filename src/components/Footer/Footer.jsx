import "./footer.css";
import { Link } from "react-router-dom";
import githubImage from "../../assets/github.svg";
import fbImage from "../../assets/fb-image.svg";

export function Footer() {
  return (
    <footer id="contacts" className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © 2024 Supersite, Powered by News API
        </p>
        <nav className="footer__links">
          <ul className="footer__navigation">
            <li className="footer__nav-item">
              <Link to="/" className="footer__nav-link">
                Home
              </Link>
            </li>
            <li className="footer__nav-item">
              <a
                href="https://tripleten.com/"
                className="footer__nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                TripleTen
              </a>
            </li>
          </ul>
          <ul className="footer__social-list">
            <li className="footer__social-item">
              <a
                href="https://github.com/Azionne"
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={githubImage}
                  alt="GitHub"
                  className="footer__social-icon"
                />
              </a>
            </li>
            <li className="footer__social-item">
              <a
                href="https://www.facebook.com/"
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={fbImage}
                  alt="Facebook"
                  className="footer__social-icon"
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
