import React, {Component} from 'react';
//import io from "socket.io-client";
//import Socket from './../socket/socket';


class Chat extends Component {

    sendMessage(e){
  var x = document.getElementById("btn1").name;
  console.log("clicked");
  }



render(){
  return (
    <div>
    <div className="chatfield">
      <li></li>
      <p></p>
      <ul id="messages"></ul>
    </div>
    <input type="text" id="myMessage"/>
    <input className="button" onClick={this.sendMessage} type="submit" id="sendButton" value="SEND"/>
    </div>
  );

}

}



export default Chat;
