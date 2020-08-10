import React, {Component} from 'react';
import './App.css';
import Users from './Components/users/users'
import Participants from './Components/participants/participants'
import Screen from './Components/screen/screen'
import Chat from './Components/chat/chat'



class App extends Component {


  constructor(props) {
     super(props);
     this.state = {
      value: '',
      user : '',
      loading: true
      };
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);

   }

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  handleSubmit(event) {
    console.log("making request")
    fetch("/api/user", {
        method:"POST",
        cache: "no-cache",
        headers:{
            "content_type":"application/json",
        },
        }
      ).then(response => {
        return response.json()
      }).then(json => {
      console.log=(json)
      this.setState({user: json})
    })
  }


render(){
  return (
    <div className="row">
    <div className="header">
    <h1>Guess The Price</h1>
    </div>
    <div className="left-section">
    <form onSubmit={this.handleSubmit} action="/api/user" id="login_session" method="POST">
    <h2>Session Creator</h2>
    <p>Name:</p>
    <input type="text" name="nm" onChange={this.handleChange}/>
    <input type="submit" value="Login"/>
    </form>
    <Screen />
    </div>
    <div className="right-section">
    <h1> Player Name: {this.state.user} </h1>
    <Users />
    <Participants />
    <Chat />
    </div>

    </div>
  );

}
}

export default App;
