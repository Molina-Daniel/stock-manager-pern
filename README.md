# Stock Manager PERN

A full-stack product inventory management system built with the PERN (PostgreSQL, Express, React, Node.js) stack with TypeScript.

![Stock Manager](https://i.imgur.com/qW3ua1y.png)

## Overview

Stock Manager is a comprehensive solution for managing and administrating a stock of products. The application allows you to create, read, update, and delete products, as well as toggle their availability status.

## Features

- ✅ **Product Management**: Add, edit, view, and delete products
- ✅ **Availability Toggle**: Quickly change product availability status
- ✅ **TypeScript**: Full type safety across the entire stack
- ✅ **API Documentation**: Swagger UI for easy API exploration
- ✅ **Modern Architecture**: Monorepo with separate frontend and backend

## Tech Stack

### Frontend

- **[React 19](https://react.dev/)**: Modern UI library
- **[TypeScript](https://www.typescriptlang.org/)**: Type safety for JavaScript
- **[React Router 7](https://reactrouter.com/)**: Client-side routing
- **[TailwindCSS 4](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Valibot](https://valibot.dev/)**: Schema validation library
- **[Axios](https://axios-http.com/)**: HTTP client for API requests

### Backend

- **[Node.js](https://nodejs.org/)**: JavaScript runtime
- **[Express](https://expressjs.com/)**: Web application framework
- **[TypeScript](https://www.typescriptlang.org/)**: Type safety for JavaScript
- **[PostgreSQL](https://www.postgresql.org/)**: SQL database
- **[Sequelize](https://sequelize.org/)**: ORM for database operations
- **[Swagger](https://swagger.io/)**: API documentation
- **[Jest](https://jestjs.io/)**: JavaScript testing framework
- **[Supertest](https://github.com/ladjs/supertest)**: HTTP assertions for API testing

## Project Structure

The project follows a monorepo structure with two main folders:

```bash
stock-manager-pern/
├── client/ - React frontend
│ ├── src/
│ │ ├── components/ - Reusable UI components
│ │ ├── layouts/ - Page layouts
│ │ ├── services/ - API client services
│ │ ├── types/ - TypeScript type definitions
│ │ ├── utils/ - Utility functions
│ │ └── views/ - Page components
│ └── ...
└── server/ - Express backend
├── src/
│ ├── config/ - Configuration files
│ ├── handlers/ - Request handlers
│ ├── middleware/ - Express middleware
│ ├── models/ - Data models
│ └── **test**/ - Test files
└── ...
```

## API Documentation

The API is documented using Swagger UI and is available at:
[https://stock-manager-pern-server.onrender.com/docs/](https://stock-manager-pern-server.onrender.com/docs/)

![Swagger UI](https://i.imgur.com/f9Gc84f.png)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/Molina-Daniel/stock-manager-pern.git
cd stock-manager-pern
```

2. Install dependencies for both client and server

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Configure environment variables

- Create a `.env` file in the server directory
- Create a `.env` file in the client directory

### Running the Application

#### Development Mode

1. Start the backend server

```bash
cd server
npm run dev
```

2. Start the frontend server

```bash
cd client
npm run dev
```

### Testing

The project includes comprehensive tests for the backend using Jest and Supertest:

![Test Coverage](https://i.imgur.com/2IzfdvK.png)

```bash
# Run tests in the server directory
cd server
npm test

# Run tests with coverage report
npm run test:coverage
```

The test suite includes:

- API endpoint testing with Supertest for HTTP assertions
- Server route validation
- Product handler functionality tests
- Database interaction tests
- Middleware validation

Coverage reports are generated in the coverage directory, providing detailed insights into test coverage across the application.

## License

This project is licensed under the ISC License.
