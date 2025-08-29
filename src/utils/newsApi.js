// News API utility functions
import { getMockArticles } from "./mockData.js";

const API_KEY =
  import.meta.env.VITE_NEWS_API_KEY || "6ae54eb39fd54ae2b8845954aa1873fa";

// Handle development vs production URLs
const newsApiBaseUrl =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

// Helper function to get date 7 days ago
const getDateWeekAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};

// Helper function to get current date
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};

// Main function to search for news
export const searchNews = (query) => {
  const url = new URL(newsApiBaseUrl);

  // Add search parameters
  url.searchParams.append("q", query);
  url.searchParams.append("apiKey", API_KEY);
  url.searchParams.append("from", getDateWeekAgo());
  url.searchParams.append("to", getCurrentDate());
  url.searchParams.append("pageSize", "100");
  url.searchParams.append("language", "en"); // Optional: English articles only

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === "error") {
        throw new Error(data.message || "API returned an error");
      }
      return data.articles || [];
    })
    .catch((error) => {
      console.error("News API Error:", error);
      console.log("Falling back to mock data for demo purposes...");
      // Fallback to mock data for demo purposes
      return getMockArticles(query);
    });
};

// Helper function to format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};
