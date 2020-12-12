import React, {Component} from 'react';
import io from "socket.io-client";

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

class Chat extends Component {

constructor(props){
  super(props);
  this.state = {
  messages: "",
  message: ""
};}

componentDidMount = () => {
  socket.on("message", msg => {
    this.setState({
      messages: [...this.state.messages, msg]
    });
  });
};

onChange = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
};

onClick = () => {
  const { message } = this.state;
  if (message !== "") {
    socket.emit("message", message);
    this.setState({
      message: ""
    });
  } else {
    alert("Please Add A Message");
  }
};


render(){
  return (
    <div>
    <div className="chatfield">
      <ul id="messages">
      {this.state.messages.length > 0 &&
            Object.keys(this.state.messages).map(msg => (
                <p className="msg">{msg}</p>
            ))}
    </ul>
    </div>
    <input type="text" id="myMessage" value={this.state.message}
          name="message"
          onChange={e => this.onChange(e)}/>
    <input className="button" onClick={() => this.onClick()} type="submit" id="sendButton" value="SEND"/>
    </div>
  );

}

}



export default Chat;
