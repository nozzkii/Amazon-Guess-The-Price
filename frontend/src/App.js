import React, {Component, userState, useEffect} from 'react'
import './App.css'
import Users from './Components/users/users'
import Participants from './Components/participants/participants'
import Screen from './Components/screen/screen'
import Chat from './Components/chat/chat'
import io from "socket.io-client"
import Countdown from './Components/countdown/countdown'

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

const App = () => {

  const [messages, setMessages]= React.useState(["Hello and  Welcome"]);
  const[message, setMessage]= React.useState("");
  const [value, setValue]= React.useState("");
  const [user, setUser]=React.useState("");
  const [loading]=React.useState(true);
  const [backend]=React.useState('http://localhost:5000/');


     //handleSubmit = handleSubmit.bind(this)

  function handleChange(event) {
    setValue(event.target.value);
  }
/*
  function handleSubmit(event) {
    console.log("making request")
    fetch("/api/user", {
        method:"POST",
        cache: "no-cache",
        headers:{
            "content_type":"application/json",
        },
        body:JSON.stringify(state.user)
        }
      ).then(response => {
        response.json()
      }).then(json => {
      console.log=(json)
      setState({user: json})
    })
  }*/

    useEffect(() => {


       socket.on('connect', function() {
       console.log("connect")
       });
    });

  function sendMessage(){
    if (message !== "") {
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };

  function login(e){
  var x = document.getElementById("btn1").name
  console.log("clicked")
  }

  return (
    <div className="row">
    <div className="header">
    <h1>Guess The Price</h1>
    </div>
    <div className="left-section">
    <div className="four-column">
    <form id="login_session" method="POST">
    <input type="text" name="nm" onChange={handleChange} placeholder="Nickname"/>
    <input className="button" onClick={login} type="submit" value="Login" />
    </form>
    </div>
    <div className="four-column">
    <form action = "/logout" method = "POST">
    <input className="button" type="submit" value="Logout"/>
    </form>
    </div>
    <div className="four-column">
    <form id="join_lobby" method="POST">
    <input type="text" placeholder="Room Name"/>
    <input className="button" type="submit" value="Join lobby" />
    </form>
    </div>
    <div className="four-column">
    <form id="leave_lobby" method="POST">
    <input className="button" type="submit" value="Leave lobby" />
    </form>
    </div>
    <Screen />
    </div>
    <div className="right-section">
    <div className="right-side-el">
    <h1><img src={process.env.PUBLIC_URL + 'usericon.png' } className="icon" /> User {user} </h1>
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

export default App;
