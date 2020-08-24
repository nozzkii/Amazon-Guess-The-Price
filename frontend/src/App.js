import React, {Component} from 'react'
import './App.css'
import Users from './Components/users/users'
import Participants from './Components/participants/participants'
import Screen from './Components/screen/screen'
import Chat from './Components/chat/chat'
import io from "socket.io-client"
import Countdown from './Components/countdown/countdown'


class App extends Component {


  constructor(props) {
     super(props);
     this.state = {
      value: '',
      user : '',
      loading: true,
      backend: 'http://localhost:5000/'
      };

     this.handleChange = this.handleChange.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this)
   }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    console.log("making request")
    fetch("/api/user", {
        method:"POST",
        cache: "no-cache",
        headers:{
            "content_type":"application/json",
        },
        body:JSON.stringify(this.state.user)
        }
      ).then(response => {
        response.json()
      }).then(json => {
      console.log=(json)
      this.setState({user: json})
    })
  }

  componentDidMount() {
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

  sendMessage(e){
  var x = document.getElementById("btn1").name
  console.log("clicked")

  }

render(){
  return (
    <div className="row">
    <div className="header">
    <h1>Guess The Price</h1>
    </div>
    <div className="left-section">
    <div className="four-column">
    <form onSubmit={this.handleSubmit} id="login_session" method="POST">
    <input type="text" name="nm" onChange={this.handleChange} placeholder="Nickname"/>
    <input className="button" onClick={this.sendMessage} type="submit" value="Login" />
    </form>
    </div>
    <div className="four-column">
    <form action = "/logout" method = "POST">
    <input className="button" type="submit" value="Logout"/>
    </form>
    </div>
    <div className="four-column">
    <form onSubmit={this.handleSubmit} id="join_lobby" method="POST">
    <input type="text" placeholder="Room Name"/>
    <input className="button" onClick={this.sendMessage} type="submit" value="Join lobby" />
    </form>
    </div>
    <div className="four-column">
    <form onSubmit={this.handleSubmit} id="leave_lobby" method="POST">
    <input className="button" onClick={this.sendMessage} type="submit" value="Leave lobby" />
    </form>
    </div>
    <Screen />
    </div>
    <div className="right-section">
    <div className="right-side-el">
    <h1> User {this.state.user} </h1>
    <Users />
    <Participants />
    <Chat />
    <input type="text" id="estimate"/>
    <input className="button" type="submit" id="sendButton" value="ESTIMATE"/>
    <input className="button" type="submit" id="nextProduct" id="createScreenshot" value="NEXT PRODUCT"/>
    <Countdown/>
    </div>
    </div>

    </div>
  );

}
}

export default App;
