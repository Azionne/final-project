// Mock data for testing when API isn't available
export const mockArticles = [
  {
    source: { name: "TechCrunch" },
    title: "Breaking: New AI Technology Revolutionizes News Discovery",
    description:
      "A groundbreaking artificial intelligence system has been developed that can analyze and categorize news articles with unprecedented accuracy, helping users find the most relevant content.",
    urlToImage: "https://via.placeholder.com/320x200/2f71e5/white?text=AI+News",
    publishedAt: "2024-01-15T10:30:00Z",
    url: "https://example.com/ai-news-1",
  },
  {
    source: { name: "BBC News" },
    title: "Climate Change Summit Reaches Historic Agreement",
    description:
      "World leaders have reached a landmark agreement on climate action, setting ambitious targets for carbon reduction and renewable energy adoption.",
    urlToImage:
      "https://via.placeholder.com/320x200/4ade80/white?text=Climate+News",
    publishedAt: "2024-01-14T14:22:00Z",
    url: "https://example.com/climate-news-1",
  },
  {
    source: { name: "The Verge" },
    title: "Space Exploration Reaches New Milestone",
    description:
      "A successful mission to Mars has yielded valuable scientific data, bringing us one step closer to understanding the potential for life on other planets.",
    urlToImage:
      "https://via.placeholder.com/320x200/a855f7/white?text=Space+News",
    publishedAt: "2024-01-13T08:45:00Z",
    url: "https://example.com/space-news-1",
  },
  {
    source: { name: "Reuters" },
    title: "Global Economy Shows Signs of Recovery",
    description:
      "Economic indicators suggest a steady recovery across major markets, with unemployment rates declining and consumer confidence improving.",
    urlToImage:
      "https://via.placeholder.com/320x200/f59e0b/white?text=Economy+News",
    publishedAt: "2024-01-12T16:15:00Z",
    url: "https://example.com/economy-news-1",
  },
  {
    source: { name: "CNN" },
    title: "Medical Breakthrough in Cancer Treatment",
    description:
      "Researchers have developed a new treatment method that shows promising results in early trials, offering hope to millions of patients worldwide.",
    urlToImage:
      "https://via.placeholder.com/320x200/ef4444/white?text=Medical+News",
    publishedAt: "2024-01-11T12:30:00Z",
    url: "https://example.com/medical-news-1",
  },
];

// Function to simulate API delay
export const getMockArticles = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter articles based on query (simple simulation)
      const filtered = mockArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.description.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered.length > 0 ? filtered : mockArticles);
    }, 1000); // Simulate 1 second delay
  });
};
