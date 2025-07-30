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
        <section className="search-results">
          <Preloader />
        </section>
      );
    }

    if (searchError) {
      return (
        <section className="search-results">
          <div className="search-results__error">
            <p>
              Sorry, something went wrong during the request. Please try again
              later.
            </p>
          </div>
        </section>
      );
    }

    if (articles.length === 0) {
      return (
        <section className="search-results">
          <div className="search-results__nothing-found">
            <img
              src={notFoundImg}
              alt="Nothing found"
              className="search-results__not-found-img"
            />
            <h3>Nothing found</h3>
            <p>
              Sorry, but nothing matched
              <br />
              your search terms.
            </p>
          </div>
        </section>
      );
    }

    return (
      <section className="search-results">
        <h3 className="search-results__title">Search results</h3>
        <div className="search-results__cards">
          {articles.slice(0, visibleCards).map((article, index) => (
            <NewsCard
              key={`${article.url}-${index}`}
              article={article}
              isLoggedIn={isLoggedIn}
              onSave={(article) => onSaveArticle(article, article.keyword)}
              isSaved={isArticleSaved(article)}
              showDelete={false}
            />
          ))}
        </div>
        {visibleCards < articles.length && (
          <button
            className="search-results__show-more"
            onClick={handleShowMore}
          >
            Show more
          </button>
        )}
      </section>
    );
  };

  return (
    <>
      <div className="main__hero">
        <Header
          isLoggedIn={isLoggedIn}
          userName={userName}
          onSignInClick={onSignInClick}
          onSignUpClick={onSignUpClick}
          onLogout={onLogout}
          theme="dark"
        />
        <div className="main__content">
          <h1 className="main__title">What's going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSubmit={onSearch} />
        </div>
      </div>
      {renderSearchResults()}
    </>
  );
}
