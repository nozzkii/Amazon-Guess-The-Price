import React, {Component} from 'react';
import io from "socket.io-client"

class Socket extends Component {


    constructor() {
     this.state = {
      backend: 'http://localhost:5000/'
      };
   }


    connect() {
    const socket = io(this.state.backend);

    socket.on('connect', function() {
    console.log("connect")
    socket.emit('connected', {data: 'I\'m connected!'})
    });

    /*socket.on('disconnect', function(){
      socket.emit('disconnect', {data: 'I\'m disconnected!'});
    });*/

    socket.on('message', function(msg) {
    document.getElementById("messages").innerHTML = msg
    /*$("#messages").append('<li class="msg">'+msg+'</li>');*/
    console.log('Received message')
    /*objDiv.scrollTop = objDiv.scrollHeight;*/
    });
  }
}

export default Socket;