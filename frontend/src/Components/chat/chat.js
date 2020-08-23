import React, {Component} from 'react';



class Chat extends Component {



render(){
  return (
    <div>
    <div className="chatfield">
      <li></li>
      <p></p>
      <ul id="messages"></ul>
    </div>
    <input type="text" id="myMessage"></input>
    <input className="button" type="submit" id="sendButton" value="SEND"/>
    </div>
  );

}

}

export default Chat;
