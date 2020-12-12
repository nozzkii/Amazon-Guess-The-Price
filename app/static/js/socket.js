$(document).ready(function() {

var socket = io.connect('localhost:5000/');
var messageDiv = document.getElementById("messages");
var myMessageDiv = document.getElementById("myMessages");
var node = document.createElement("LI");
var br = document.createElement("BR");                



socket.on('connect', function() {
console.log("connected");
});

socket.on('message', function(msg) {
var textnode = document.createTextNode(msg);     
node.appendChild(textnode); 
messageDiv.appendChild(node);

console.log('Received message');
});

socket.on('screenshot', function(msg) {
   console.log("Received image");
   $("#img_url").append(msg.img_url);
 });

socket.on('countdown', function(msg) {
    console.log("countdown");
    $(".timer").append(msg.timespan);
});

socket.on('estimate', function() {
socket.emit('estimate', {data: 'I\'ve sent'});
console.log("received price estimation");
});

$('#createScreenshot').on('click', function() {
    $('#img_url').empty();
    socket.emit('screenshot');
 });

 $('#productbutton').on('click', function() {
     console.log("sent");
  });

 socket.emit('countdown');

$('#sendButton').on('click', function() {
socket.send($('#myMessage').val());
$('#myMessage').val('');
});


});
