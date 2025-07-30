import "./footer.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import githubImage from "../../assets/github-image.jpg";
import fbImage from "../../assets/fb-image.svg";

export function Footer() {
  return (
    <footer id="contacts" className="footer">
      <div className="footer__content">
        <p className="footer__copyright">
          © 2024 Supersite, Powered by News API
        </p>
        <div className="footer__links">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <a
            href="https://tripleten.com/"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>
          <a href="https://github.com/Azionne" className="footer__social-link">
            <img
              src={githubImage}
              alt="github-logo"
              className="footer__social-icon"
            />
          </a>
          <a href="https://www.facebook.com/" className="footer__social-link">
            <img
              src={fbImage}
              alt="facebook-logo"
              className="footer__social-icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
