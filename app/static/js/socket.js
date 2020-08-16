$(document).ready(function() {

   var socket = io.connect('localhost:5000/');
   var objDiv = document.getElementById("messages");

socket.on('connect', function() {
socket.emit('connected', {data: 'I\'m connected!'});
});

socket.on('message', function(msg) {
$("#messages").append('<li class="msg">'+msg+'</li>');
console.log('Received message');
objDiv.scrollTop = objDiv.scrollHeight;
});

socket.on('screenshot', function(msg) {
   console.log("Received image");
   $("#img_url").append(msg.img_url);
 });

socket.on('countdown', function(msg) {
    console.log("countdown");
    $(".timer").append(msg.timespan);
});


$('#createScreenshot').on('click', function() {
    $('#img_url').empty();
    socket.emit('countdown');
    socket.emit('screenshot');
 });

 socket.emit('countdown');

$('#sendButton').on('click', function() {
socket.send($('#myMessage').val());
$('#myMessage').val('');
});


});
