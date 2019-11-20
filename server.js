
//this is used to connect to the port using socket
const io = require('socket.io')(3211)

const users = {}

//whenevr the user loads the page the client gets the message through that
io.on('connection',socket => {
    socket.on('new-user',name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    //console.log("new user");
    socket.emit('chat-message','hello world');
    socket.on('send-chat-message',message => {
        //console.log(message);
        //the below line helps to send the message to othes who ever log through this except the person who sends the message 
        socket.broadcast.emit('chat-message',{message:message,name:users[socket.id]})
    })
//disconnect message 
    socket.on('disconnect',() => {
      
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id]
    })
}) 