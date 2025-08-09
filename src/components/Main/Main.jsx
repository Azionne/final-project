import "./main.css";
import Header from "../Header/Header.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import NewsCard from "../NewsCard/NewsCard.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import notFoundImg from "../../assets/not-found_v1.svg";
import { useState } from "react";

export function Main({
  isLoggedIn,
  userName,
  onSignInClick,
  onSignUpClick,
  onLogout,
  onSearch,
  articles,
  isLoading,
  searchError,
  hasSearched,
  savedArticles,
  onSaveArticle,
}) {
  const [visibleCards, setVisibleCards] = useState(3);

  const handleShowMore = () => {
    setVisibleCards((prev) => Math.min(prev + 3, articles.length));
  };

  const isArticleSaved = (article) => {
    return savedArticles.some((saved) => saved.url === article.url);
  };

  const renderSearchResults = () => {
    if (!hasSearched) {
      return null;
    }

    if (isLoading) {
      return (
        <section className="main__search-results" aria-live="polite">
          <Preloader />
        </section>
      );
    }

    if (searchError) {
      return (
        <section
          className="main__search-results"
          role="alert"
          aria-live="assertive"
        >
          <div className="main__search-error">
            <p className="main__search-error-text">
              Sorry, something went wrong during the request. Please try again
              later.
            </p>
          </div>
        </section>
      );
    }

    if (articles.length === 0) {
      return (
        <section className="main__search-results" aria-live="polite">
          <div className="main__nothing-found">
            <img
              src={notFoundImg}
              alt="No search results found"
              className="main__not-found-image"
            />
            <h3 className="main__nothing-found-title">Nothing found</h3>
            <p className="main__nothing-found-text">
              Sorry, but nothing matched
              <br />
              your search terms.
            </p>
          </div>
        </section>
      );
    }

    return (
      <section
        className="main__search-results"
        aria-live="polite"
        aria-labelledby="search-results-title"
      >
        <h2 id="search-results-title" className="main__search-results-title">
          Search results
        </h2>
        <div
          className="main__cards-container"
          role="list"
          aria-label={`${articles.length} search results found`}
        >
          {articles.slice(0, visibleCards).map((article, index) => (
            <div key={`${article.url}-${index}`} role="listitem">
              <NewsCard
                article={article}
                isLoggedIn={isLoggedIn}
                onSave={(article) => onSaveArticle(article, article.keyword)}
                isSaved={isArticleSaved(article)}
                showDelete={false}
              />
            </div>
          ))}
        </div>
        {visibleCards < articles.length && (
          <button
            className="main__show-more-button"
            onClick={handleShowMore}
            type="button"
            aria-label={`Show ${Math.min(
              3,
              articles.length - visibleCards
            )} more articles out of ${
              articles.length - visibleCards
            } remaining`}
          >
            Show more
          </button>
        )}
      </section>
    );
  };

  return (
    <main className="main" role="main">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onSignInClick={onSignInClick}
        onSignUpClick={onSignUpClick}
        onLogout={onLogout}
        theme="dark"
      />
      <header className="main__hero">
        <section className="main__content">
          <h1 className="main__title">What's going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSubmit={onSearch} />
        </section>
      </header>
      {renderSearchResults()}
    </main>
  );
}
