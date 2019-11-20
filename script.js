
//create a variable socket and put the host where the app wants to be 
const socket = io('http://localhost:3211')

//selcting the form 
const messageform = document.getElementById('send-container');
//get the message container 
const messagecontainer = document.getElementById('message-container');
//getting the input using slelctor
const messageinput = document.getElementById('message-input')
//prompt elememt
const name = prompt('what is your name');
appendmessage('You joined');
socket.emit('new-user', name)

//create the function that message is getting from the server.io that is hello world 
socket.on('chat-message', data => {
   // console.log(data);
   appendmessage(`${data.name}: ${data.message}`);
})

socket.on('user-disconnected',name=>{
    appendmessage(`${name} disconnected`)
})

socket.on('user-connected',name=>{
    appendmessage(`${name} connected`)
})

//adding event listener whenever the form is get submitted 
messageform.addEventListener('submit',e => {
    //this is to prevent from loading the entire page that message will be deleted 
    e.preventDefault()
    const message = messageinput.value
    appendmessage(`You : ${message}`)
    socket.emit('send-chat-message',message)
    messageinput.value = ''

})


function appendmessage(message)
{
    const messageele = document.createElement('div');
    messageele.innerText = message
    messagecontainer.append(messageele)
}