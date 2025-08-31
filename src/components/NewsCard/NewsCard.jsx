import "./newsCard.css";
import { formatDate } from "../../utils/newsApi";
import { useState } from "react";
import trashIcon from "../../assets/trash.svg";
import bookmarkIcon from "../../assets/bookmark.svg";
import bookmarkSavedIcon from "../../assets/bookmark-saved.svg";

// Single NewsCard component
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
        {/* Keyword pill for saved cards */}
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
          <button
            className={`news-card__save-button${
              isSaved ? " news-card__save-button--active" : ""
            }`}
            onClick={handleSaveClick}
            aria-label={isSaved ? "Remove bookmark" : "Save bookmark"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={isSaved ? bookmarkSavedIcon : bookmarkIcon}
              alt="Save article"
              width={24}
              height={24}
              className="news-card__bookmark-icon"
            />
            {showTooltip && (
              <div className="news-card__tooltip">Sign in to save articles</div>
            )}
          </button>
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

// NewsCardList function inside NewsCard.jsx
export function NewsCardList({
  articles,
  isLoggedIn,
  savedArticles,
  onSaveArticle,
  showDelete = false,
}) {
  const [visibleCards, setVisibleCards] = useState(3);

  const handleShowMore = () => {
    setVisibleCards((prev) => Math.min(prev + 3, articles.length));
  };

  const isArticleSaved = (article) =>
    savedArticles.some((saved) => saved.url === article.url);

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="news-card-list" aria-live="polite">
      <h2 className="news-card-list__title">Search results</h2>
      <ul className="news-card-list__list">
        {articles.slice(0, visibleCards).map((article, index) => (
          <li key={`${article.url}-${index}`} className="news-card-list__item">
            <NewsCard
              article={article}
              isLoggedIn={isLoggedIn}
              onSave={onSaveArticle}
              isSaved={isArticleSaved(article)}
              showDelete={showDelete}
            />
          </li>
        ))}
      </ul>
      {visibleCards < articles.length && (
        <button
          className="news-card-list__show-more"
          onClick={handleShowMore}
          type="button"
        >
          Show more
        </button>
      )}
    </section>
  );
}

export default NewsCard;
