// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
cors: { origin: '*' }
});


app.use(express.static(path.join(__dirname, 'public')));


const users = new Map();


io.on('connection', (socket) => {
console.log('Client connected:', socket.id);


socket.on('register', (username) => {
socket.username = username;
users.set(username, socket.id);
io.emit('user-list', Array.from(users.keys()));
});


socket.on('message', (payload) => {
const { to, text } = payload;
const message = { from: socket.username || socket.id, text, ts: Date.now() };


if (!to || to === 'all') {
io.emit('message', message);
} else if (users.has(to)) {
const targetSocketId = users.get(to);
io.to(targetSocketId).emit('message', message);
socket.emit('message', message);
} else {
io.to(to).emit('message', message);
}
});


socket.on('join-room', (room) => {
socket.join(room);
socket.to(room).emit('message', { from: 'system', text: ${socket.username||socket.id} joined ${room}, ts: Date.now() });
});


socket.on('disconnect', () => {
console.log('Client disconnected:', socket.id);
if (socket.username) {
users.delete(socket.username);
io.emit('user-list', Array.from(users.keys()));
}
});
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(Server listening on port ${PORT}));
