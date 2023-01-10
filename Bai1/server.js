const path = require('path')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;

app.use(express.static( 'public'));
app.set('view engine', 'ejs');
app.set('views', 'views');
server.listen(port);

var ListUser = ["AAA"];
io.on('connection', (socket) => {
    console.log(socket.id +' connected');
    socket.on("client-send-Username",function(data){
      if(ListUser.indexOf(data) >=0){
        // that bai
        socket.emit("Dangki-thatbai");
      }else{
        ListUser.push(data);
        socket.Username = data;
        socket.emit("Dangki-thanhcong",data);
        io.sockets.emit("Danhsach-User",ListUser);
      }
    })
    socket.on('logout',()=>{
      ListUser.splice(ListUser.indexOf(socket.Username),1);
      socket.broadcast.emit("Danhsach-User",ListUser);
    });
    socket.on('client-send-message',(data)=>{
      io.sockets.emit('Server-send-message',{un:socket.Username,dt : data}); // un : username, dt = data
    });
    // socket.on('toi-dang-go',()=>{
    //   socket.broadcast.emit("ai-do-dang-go",socket.Username +" dang go");
    // })
    // socket.on('toi-stop-go',()=>{
    //   console.log("dep trai");
    //   socket.broadcast.emit("ai-do-stop-dang-go","");
    // })
});

app.get('/',(req,res)=>{
    res.render('trangchu');
});
