require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

// Store chat rooms and users in memory
const rooms = {};
const users = {};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Real-time Chat Server is Running 🚀");
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // User authentication (simple username-based)
  socket.on("auth_user", (username) => {
    users[socket.id] = username;
    socket.emit("auth_success", { username, rooms: Object.keys(rooms) });
  });

  // Create a chat room
  socket.on("create_room", (room) => {
    if (!rooms[room]) {
      rooms[room] = { users: [], messages: [] };
      io.emit("rooms_updated", Object.keys(rooms)); // Notify all clients
    }
  });

  // Join a room
  socket.on("join_room", (room) => {
  if (rooms[room]) {
    const username = users[socket.id];

    if (!rooms[room].users.includes(username)) {
      rooms[room].users.push(username);
    }

    socket.join(room);

    io.to(room).emit("user_joined", { users: rooms[room].users });
    socket.emit("room_history", { room, messages: rooms[room].messages });
  }
});

  // Handle sending messages
  socket.on("send_message", ({ room, message }) => {
    const chatMessage = {
      id: Date.now(),
      username: users[socket.id],
      message,
      timestamp: new Date().toISOString()
    };

    if (rooms[room]) {
      rooms[room].messages.push(chatMessage);
      io.to(room).emit("receive_message", chatMessage);
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    // Remove user from all rooms
    for (let room in rooms) {
      rooms[room].users = rooms[room].users.filter(user => user !== users[socket.id]);
      io.to(room).emit("user_left", { users: rooms[room].users });
    }

    delete users[socket.id];
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
