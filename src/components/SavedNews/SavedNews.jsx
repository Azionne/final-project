import "./savedNews.css";
import Header from "../Header/Header.jsx";
import NewsCard from "../NewsCard/NewsCard.jsx";

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

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onSignInClick={onSignInClick}
        onSignUpClick={onSignUpClick}
        onLogout={onLogout}
        theme="light"
      />
      <div className="saved-news">
        <div className="saved-news__header">
          <h1 className="saved-news__title">
            {isLoggedIn && userName
              ? `${userName}, you have ${savedArticles.length} saved article${
                  savedArticles.length !== 1 ? "s" : ""
                }`
              : "Saved articles"}
          </h1>
          {isLoggedIn && userName && savedArticles.length > 0 && (
            <p
              className="saved-news__subtitle"
              style={{ fontWeight: 400, fontSize: "16px", marginTop: "8px" }}
            >
              By keywords:{" "}
              <span style={{ fontWeight: 600 }}>
                Nature, Yellowstone, and 2 other
              </span>
            </p>
          )}
          {!isLoggedIn && (
            <p className="saved-news__subtitle">
              Please log in to view your saved articles.
            </p>
          )}
        </div>

        {isLoggedIn ? (
          <>
            {savedArticles.length > 0 ? (
              <div className="saved-news__articles">
                {savedArticles.map((article, index) => (
                  <NewsCard
                    key={`${article.url}-${index}`}
                    article={article}
                    isLoggedIn={isLoggedIn}
                    onSave={(article) =>
                      onSaveArticle(article, article.keyword)
                    }
                    isSaved={isArticleSaved(article)}
                    showDelete={true}
                  />
                ))}
              </div>
            ) : (
              <div className="article-placeholder">
                <h3>No saved articles yet</h3>
                <p>
                  Start exploring news and save articles you find interesting!
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="saved-news__login-prompt">
            <p>Log in to access your saved articles collection.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default SavedNews;
