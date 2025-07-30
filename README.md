# SE Project React - NewsExplorer

This app lets users search for the latest news articles in real-time and save their favorite stories. It features user authentication, responsive design, and dynamic UI updates based on user actions and API data.

I've used React and the NewsAPI to fetch and display news articles based on user search queries. The app supports user registration, login, and saving/removing articles. Form validation is implemented for authentication and search, and modals are used for sign in, sign up, and registration success. The UI is styled for both desktop and mobile, with pixel-perfect modals and header.

## Features

- Real-time news search using NewsAPI
- User registration and login with form validation
- Save and remove favorite news articles
- Responsive, mobile-friendly design
- Pixel-perfect modals and header styling
- Error handling for registration, login, and search

## Technology Stack

- Programming Language: JavaScript (ES6+)
- Framework: React (Vite)
- Styling: CSS (custom, BEM, media queries)
- API: NewsAPI.org

## Installation

### Prerequisites

- Node.js (v16+ recommended)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone git@github.com:Azionne/final-project.git
   cd final-project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Set up environment variables for API keys if needed.
4. Run the application:
   ```bash
   npm run dev
   ```

## Usage

1. Enter a search term to find news articles.
2. Register or sign in to save articles.
3. View and manage your saved news in the Saved News section.

## Project Structure

```
final-project/
├── src/                    # Source code (components, assets, utils)
├── public/                 # Static files
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- **Author**: Azionne
- **GitHub**: [github.com/Azionne](https://github.com/Azionne)
