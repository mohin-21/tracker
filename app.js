const express = require("express");
const app = express();
const path = require("path");

const http = require("http");


const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "/public")));

io.on("connection", function (socket){
  socket.on("send-location", (data) =>{
    io.emit("receive-location", {id: socket.id, ...data});
  }),
  socket.on("disconnect", () =>{
    io.emit("user-disconnected", socket.id);
  })
})

app.get('/', (req, res) => {
  res.render("index");
});

server.listen(8000, () => {
  console.log('server running at http://localhost:8000');
});