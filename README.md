# Amazon Web Scraper

## 📦 Overview

This Amazon Web Scraper is a full-stack application designed to scrape product information from Amazon[Title, Rating, Number of Reviews and Image Url).

## 🚀 Features

- Web scraping of Amazon product pages
- Real-time data extraction
- Structured product information parsing
- Environment-based configuration
- Robust error handling
- Type-safe data validation

## 🛠 Tech Stack

### Frontend
- [Vite](https://vitejs.dev/): Next-generation frontend tooling
- Javascript
- [Bun](https://bun.sh/): All-in-one JavaScript runtime & toolkit

### Backend
- Typescript
- [Express.js](https://expressjs.com/): Web application framework
- [JSDOM](https://github.com/jsdom/jsdom): HTML parsing and manipulation
- [Axios](https://axios-http.com/): HTTP request library
- [Zod](https://zod.dev/): TypeScript-first schema validation
- [dotenv](https://github.com/motdotla/dotenv): Environment variable management

## 📋 Prerequisites

- [Bun](https://bun.sh/) (v1.0+ recommended)
- Git

## 🔧 Installation

### Clone the Repository
```bash
git clone [https://github.com/RafaelMTA/AmzWebScraper.git]
cd AmzWebScraper
```

### Install Dependencies
```bash
# Install client dependencies
cd client
bun install

# Install server dependencies
cd ../server
bun install
```

### Environment Configuration
1. In the `server` directory, create a `.env` file
2. Add necessary environment variables:
```
PORT=5000
NODE_ENV=development
AMAZON_API_PREFIX=https://www.amazon.com.br
```

## 🏃 Running the Application

### Start Backend Server
```bash
cd server
bun run start
# Or use Bun's built-in dev mode
bun run dev
```

### Start Frontend Client
```bash
cd client
bun vite
```

## 🚀 Bun-Specific Benefits

- Faster package installation
- Built-in TypeScript and JSX support
- Improved performance
- Native HTTP server capabilities
- Integrated test runner and package manager

## 🔍 Project Structure
```

│
├── client/                 # Vite frontend
│   ├── src/
│   └── bun.lockb           # Bun lockfile
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── configs/
│   │   ├── controllers/
│   │   ├── handlers/
│   │   ├── interfaces/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   └── bun.lockb           # Bun lockfile
└── README.md
```

## ⚖️ Legal Disclaimer

This web scraper is for educational purposes only. Ensure you comply with Amazon's Terms of Service and robots.txt when using this tool. Always respect website scraping guidelines and implement proper rate limiting.

## 🔧 Troubleshooting Bun

If you encounter any issues:
- Ensure you're using the latest version of Bun
- Check Bun's compatibility with project dependencies
- Use `bun pm fix` to resolve potential package conflicts
