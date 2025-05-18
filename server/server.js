import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.js";
import User from "./models/user.model.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("MongoDB connected"));

// API routes
app.use("/api/auth", authRoutes);

// --- SOCKET.IO Real-time Location Handler ---
const socketToUser = new Map();
const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("location-update", async ({ userId, lat, lng }) => {
    if (!userId || !lat || !lng) return;
    activeUsers.set(userId, { lat, lng, socketId: socket.id });
    socketToUser.set(socket.id, userId);

    const allUserData = await Promise.all(
      [...activeUsers.entries()].map(async ([id, loc]) => {
        const user = await User.findById(id).select("email");
        return {
          _id: id,
          email: user?.email || "Unknown",
          location: { lat: loc.lat, lng: loc.lng },
        };
      })
    );
    io.emit("location-data", allUserData);
  });

  socket.on("disconnect", async () => {
    console.log("User disconnected:", socket.id);

    const userId = socketToUser.get(socket.id);
    if (userId) {
      activeUsers.delete(userId);
      socketToUser.delete(socket.id); 
      console.log(`Removed user ${userId} from activeUsers`);
    }

    // Broadcast updated user list
    const allUserData = await Promise.all(
      [...activeUsers.entries()].map(async ([id, loc]) => {
        const user = await User.findById(id).select("email");
        return {
          _id: id,
          email: user?.email || "Unknown",
          location: { lat: loc.lat, lng: loc.lng },
        };
      })
    );

    io.emit("location-data", allUserData);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
