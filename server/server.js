const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('A user just connected.');

    socket.on('startGame', () => {
        io.emit('startGame');
    })

    socket.on('cryzyIsClicked', (data) => {
        io.emit('cryzyIsClicked', data);
    })

    socket.on('disconnection', () => {
        console.log('A user has disconnected.');
    })
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});