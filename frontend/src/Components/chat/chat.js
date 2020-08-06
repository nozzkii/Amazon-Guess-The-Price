import React, {Component} from 'react';



class Chat extends Component {



render(){
  return (
    <div>
    <div class="chatfield">
      <li></li>
      <p></p>
      <ul id="messages"></ul>
    </div>
    <input type="text" id="myMessage"></input>
    <button id="sendButton">SEND</button>
    </div>
  );

}

}

export default Chat;
