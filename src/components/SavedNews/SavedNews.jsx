import "./savedNews.css";
import NewsCard from "../NewsCard/NewsCard.jsx";
import Header from "../Header/Header.jsx";

function SavedNews({
  isLoggedIn,
  userName,
  onSignInClick,
  onSignUpClick,
  onLogout,
  savedArticles,
  onSaveArticle,
}) {
  const isArticleSaved = (article) => {
    return savedArticles.some((saved) => saved.url === article.url);
  };

  // Calculate unique keywords for display
  const getUniqueKeywords = () => {
    const keywords = savedArticles
      .map((article) => article.keyword)
      .filter(Boolean)
      .filter((keyword, index, array) => array.indexOf(keyword) === index);

    if (keywords.length === 0) return "";
    if (keywords.length <= 2) return keywords.join(", ");

    return `${keywords.slice(0, 2).join(", ")}, and ${
      keywords.length - 2
    } other${keywords.length - 2 > 1 ? "s" : ""}`;
  };

  return (
    <div className="saved-news">
      <Header
        isLoggedIn={isLoggedIn}
        onSignInClick={onSignInClick}
        onSignUpClick={onSignUpClick}
        onLogout={onLogout}
        userName={userName}
        theme="light"
      />

      <section className="saved-news__hero">
        <div className="saved-news__hero-content">
          {isLoggedIn && userName && (
            <p className="saved-news__label">Saved articles</p>
          )}

          <h1 className="saved-news__title">
            {isLoggedIn && userName
              ? `${userName}, you have ${savedArticles.length} saved article${
                  savedArticles.length !== 1 ? "s" : ""
                }`
              : "Saved articles"}
          </h1>

          {isLoggedIn && userName && savedArticles.length > 0 && (
            <p className="saved-news__subtitle">
              By keywords:{" "}
              <span className="saved-news__keywords">
                {getUniqueKeywords()}
              </span>
            </p>
          )}

          {!isLoggedIn && (
            <p className="saved-news__subtitle">
              Please log in to view your saved articles.
            </p>
          )}
        </div>
      </section>

      {isLoggedIn ? (
        <section className="saved-news__articles-section">
          {savedArticles.length > 0 ? (
            <ul className="saved-news__articles-list">
              {savedArticles.map((article, index) => (
                <li
                  key={`${article.url}-${index}`}
                  className="saved-news__article-item"
                >
                  <NewsCard
                    article={article}
                    isLoggedIn={isLoggedIn}
                    onSave={(article) =>
                      onSaveArticle(article, article.keyword)
                    }
                    isSaved={isArticleSaved(article)}
                    showDelete={true}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="saved-news__empty-state">
              <h2 className="saved-news__empty-title">No saved articles yet</h2>
              <p className="saved-news__empty-text">
                Start exploring news and save articles you find interesting!
              </p>
            </div>
          )}
        </section>
      ) : (
        <section className="saved-news__login-section">
          <div className="saved-news__login-prompt">
            <p className="saved-news__login-text">
              Log in to access your saved articles collection.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default SavedNews;
