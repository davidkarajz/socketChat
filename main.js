var socket = io.connect('http://185.13.90.140:8081/');

var output = document.getElementById('output');
var user = document.getElementById('user');
var message = document.getElementById('message');
var btn = document.getElementById('send');
var feedback = document.getElementById('feedback');

btn.addEventListener('click', emitChat);

message.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      emitChat();
    }
});

function emitChat(){
    socket.emit('message', {
        message: message.value,
        user: user.value
    });
    message.value = '';
}

socket.on('message', function(data){
    feedback.innerHTML = '';
    if (data.user == "echoBot2000"){
        output.innerHTML += '<p class="self">' + data.message.slice(29 + user.value.length) + '</p>';
    }else{
        output.innerHTML += '<p>' + data.user + ': ' + data.message + '</p>';
    }
    console.log(data);
});