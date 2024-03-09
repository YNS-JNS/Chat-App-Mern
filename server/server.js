import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const port = process.env.PORT || 8080

// http.createServer([options][, requestListener])
const server = http.createServer(app);

// instance of socket.io by passing the server (the HTTP server) object
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "HEAD"]
    }
});

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello Socket.io!" });
});

// on: listen, emit: send a message
io.on("connection", (socket) => {
    console.log(`User connected with ID: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data.room);
        console.log(`User ID: ${socket.id}, ${data.userName} joined room: ${data.room}`);
    });

    socket.on("send_message", (data) => {
        console.log("received message: ", data);
        // broadcasting message received
        socket.to(data.room).emit("receive_message", data);
    })

    // built-in
    socket.on("disconnect", () => {
        console.log(`User disconnected with ID: ${socket.id}`);
    })

})

server.listen(port, () => {
    console.log('App listening on port: http://localhost:' + port);
});


// Socket.IO
// io.on('connection', (socket) => {
//     console.log(`Socket ${socket.id} connected, ${socket}`);

//     socket.on('sendMessage', (message) => {
//         io.emit('message', message);
//     });

//     socket.on('disconnect', () => {
//         console.log(`Socket ${socket.id} disconnected`);
//     });
// });

// io.on("connection", (socket) => {
//     console.log(`User Connected: ${socket.id}`);

//     socket.on("join_room", (data) => {
//         socket.join(data);
//     });

//     socket.on("send_message", (data) => {
//         socket.to(data.room).emit("receive_message", data);
//     });

//     console.log(`Socket: ${socket}`);

// });