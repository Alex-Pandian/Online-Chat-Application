const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config({ path: path.join(__dirname, 'config', '.env') });

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
  },
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));

connectDB();

app.use('/api', authRoutes);
app.use('/api', chatRoutes);
app.use('/api', messageRoutes);

io.on('connection', (socket) => {
  console.log('🔌 Socket connected:', socket.id);

  socket.on('joinChat', (chatId) => {
    socket.join(chatId);
    console.log(`🟢 User joined chat room: ${chatId}`);
  });

  socket.on('sendMessage', (message) => {
    io.to(message.chatId).emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});