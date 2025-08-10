import "./searchForm.css";
import { useState } from "react";

function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a keyword");
      return;
    }

    setError("");
    onSubmit(query.trim());
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <div className="search-form__input-container">
          <input
            type="text"
            placeholder="Enter topic"
            className={`search-form__input ${
              error ? "search-form__input--error" : ""
            }`}
            value={query}
            onChange={handleInputChange}
            aria-describedby={error ? "search-error" : undefined}
            aria-invalid={error ? "true" : "false"}
          />
          <button type="submit" className="search-form__button">
            Search
          </button>
        </div>
        {error && (
          <p id="search-error" className="search-form__error" role="alert">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}

export default SearchForm;
