# Trust Me Bro Backend

A TypeScript Node.js backend server built with Express and MongoDB.

## Project Structure

```
src/
├── controllers/    # Request handlers
├── models/        # Database models
├── routes/        # API routes
├── services/      # Business logic
├── utils/         # Utility functions
└── index.ts       # Application entry point
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/trust-me-bro
```

3. Start the server:
- For development (with auto-reload):
```bash
npm run dev
```
- For production:
```bash
npm run build
npm start
```

## API Endpoints

### Users
- `POST /api/users`: Create a new user
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get user by ID
- `PUT /api/users/:id`: Update user
- `DELETE /api/users/:id`: Delete user

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `MONGODB_URI`: MongoDB connection string 