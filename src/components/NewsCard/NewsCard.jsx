import "./newsCard.css";
import { formatDate } from "../../utils/newsApi";
import { useState } from "react";
import trashIcon from "../../assets/trash.svg";

function NewsCard({ article, isLoggedIn, onSave, isSaved, showDelete }) {
  const getCapitalizedKeyword = (keyword) => {
    if (!keyword) return "";
    return keyword.charAt(0).toUpperCase() + keyword.slice(1);
  };
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);

  const handleSaveClick = () => {
    if (isLoggedIn) {
      onSave(article);
    }
  };

  const handleMouseEnter = () => {
    if (!isLoggedIn) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <article className="news-card">
      <div className="news-card__image-container">
        {/* Keyword pill (top left) for saved cards */}
        {showDelete && isSaved && article.keyword && (
          <div className="news-card__keyword-pill">
            {getCapitalizedKeyword(article.keyword)}
          </div>
        )}
        <img
          src={
            article.urlToImage ||
            "https://via.placeholder.com/320x200/f5f5f5/666?text=News+Image"
          }
          alt={article.title}
          className="news-card__image"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/320x200/f5f5f5/666?text=News+Image";
          }}
        />
        {showDelete && isSaved ? (
          <>
            <button
              className="news-card__delete-button"
              onClick={() => onSave(article)}
              title="Remove from saved"
              onMouseEnter={() => setShowDeleteTooltip(true)}
              onMouseLeave={() => setShowDeleteTooltip(false)}
            >
              <img
                src={trashIcon}
                alt="Delete"
                style={{ width: 20, height: 20 }}
              />
            </button>
            {showDeleteTooltip && (
              <div className="news-card__delete-tooltip">Remove from saved</div>
            )}
          </>
        ) : (
          <div
            className={`news-card__save-button ${
              !isLoggedIn ? "news-card__save-button_inactive" : ""
            } ${isSaved ? "news-card__save-button_saved" : ""}`}
            onClick={handleSaveClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <svg
              width="14"
              height="19"
              viewBox="0 0 14 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.28571 3.14583C6.28571 1.95851 7.2943 1 8.54286 1C9.79141 1 10.8 1.95851 10.8 3.14583V15.4167L8.54286 13.25L6.28571 15.4167V3.14583Z"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
            {showTooltip && (
              <div className="news-card__tooltip">Sign in to save articles</div>
            )}
          </div>
        )}
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{formatDate(article.publishedAt)}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">{article.description}</p>
        <p className="news-card__source">{article.source.name}</p>
      </div>
    </article>
  );
}

export default NewsCard;
