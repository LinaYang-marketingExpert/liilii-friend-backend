# LiiLii Friend Backend

A TypeScript Node.js backend server built with Express and MongoDB.

## Project Structure

```
src/
├── models/        # Database models
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
MONGODB_URI=mongodb://localhost:27017/liilii-friend-bot
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

## Environment Variables

- `PORT`: Server port (default: 3000)
- `BOT_TOKEN`: Bot Token
- `MONGODB_URI`: MongoDB connection string 


