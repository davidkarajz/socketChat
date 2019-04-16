let socket = io.connect('http://185.13.90.140:8081/');

let output = document.getElementById('output');
let user = document.getElementById('user');
let message = document.getElementById('message');
let btn = document.getElementById('send');
let feedback = document.getElementById('feedback');

btn.addEventListener('click', emitChat);

message.addEventListener('keypress', function (e) {
    let key = e.which || e.keyCode;
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
});
