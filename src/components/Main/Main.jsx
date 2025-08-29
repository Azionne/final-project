import "./main.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import { NewsCardList } from "../NewsCard/NewsCard.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import { About } from "../About/About.jsx";
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
  // No need for visibleCards or isArticleSaved here, handled in NewsCardList

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
              className="main__nothing-found-image"
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

    // Use NewsCardList for rendering cards
    return (
      <NewsCardList
        articles={articles}
        isLoggedIn={isLoggedIn}
        savedArticles={savedArticles}
        onSaveArticle={onSaveArticle}
        showDelete={false}
      />
    );
  };

  return (
    <div className="main">
      <section className="main__hero">
        <div className="main__hero-content">
          <h1 className="main__title">What's going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSubmit={onSearch} />
        </div>
      </section>
      {renderSearchResults()}
      <About />
    </div>
  );
}
