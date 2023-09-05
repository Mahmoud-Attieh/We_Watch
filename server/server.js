require("dotenv").config();
const cors = require("cors");
const express = require("express");
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  }
});
const cookieParser = require('cookie-parser');
const PORT = 8000;


app.use(cors({

    credentials:true
}));
app.use(express.json());


app.use(cookieParser());

require("./config/mongoose.config");

require('./routes/user.routes')(app);

const favoritesRoutes = require('./routes/favorites.routes');
app.use('/api/favorites', favoritesRoutes);

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Listen for incoming messages
    socket.on('chatMessage', (message) => {
      // Broadcast the message to all connected clients
      io.emit('chatMessage', message);
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

server.listen(PORT, function () {
    console.log(`The server has started on PORT: ${PORT}`);
});
