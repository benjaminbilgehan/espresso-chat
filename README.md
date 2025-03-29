
# EspressoChat - Real-Time Chat Application

A simple real-time chat application built with React, Socket.IO, and Express.

## Features

- Real-time messaging with Socket.IO
- Username-based authentication
- Multiple chat rooms
- Create new rooms
- See active users in each room
- Persistent chat history (in-memory)

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Backend Setup

1. Navigate to the project directory:

```sh
cd chat-backend
```

2. Install the necessary backend dependencies:

```sh
npm install express socket.io cors
npm install --save-dev nodemon
```

3. Start the backend server:

```sh
npm run dev
```

### Frontend Setup

1. Navigate to the project directory:

```sh
cd hat-frontend
```

2. Install the dependencies:

```sh
npm i
```

3. Start the development server:

```sh
npm run dev
```

4. Open the application in your browser:

```
http://localhost:8080
```

## Architecture Decisions

- **Socket.IO**: Used for bidirectional real-time communication between clients and server.
- **React Context**: Used to manage socket connection and state across components.
- **In-Memory Storage**: Chat history and room information are stored in memory on the server.
- **Component Structure**: Separated into logical components like Chat, Sidebar, MessageList, etc.

## Improvements with More Time

- Add user authentication with JWT
- Persist chat history in a database (MongoDB or PostgreSQL)
- Add private messaging capabilities
- Implement read receipts
- Add file/image sharing
- Implement typings indicators
- Add message reactions
- UI improvements (themes, better mobile responsiveness)
- End-to-end encryption for messages

## License

MIT
