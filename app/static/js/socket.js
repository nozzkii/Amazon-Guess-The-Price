$(document).ready(function() {

   var socket = io.connect('localhost:5000/');

socket.on('connect', function() {
 socket.emit('connected', {data: 'I\'m connected!'});
});

socket.on('message', function(msg) {
$("#messages").append('<li class="msg">'+msg+'</li>');
console.log('Received message');
});

socket.on('screenshot', function(msg) {
   console.log("Received image");
   $("#img_url").append(msg.img_url);
 });

$('#createScreenshot').on('click', function() {
    $('#img_url').empty();
   socket.emit('screenshot');
   socket.emit('countdown');
 });

$('#sendButton').on('click', function() {
socket.send($('#myMessage').val());
$('#myMessage').val('');
});


});
