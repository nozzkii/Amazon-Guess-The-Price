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
      user : "",
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
        body:JSON.stringify(this.state.value)
        }
      ).then(response => {
        return response.json()
      }).then(json => {
      console.log=(json)
      this.setState({user: json})
      })

  }


  /*componentDidMount() {
    this.setState({ isLoading: true });
    fetch('/api/group')
      .then(response => response.json())
      .then(data => this.setState({ hits: data.hits }));
  }*/


render(){
  return (
    <div class="row">
    <div class="header">
    <h1>Guess The Price</h1>
    </div>
    <div class="left-section">
    <form onSubmit={this.handleSubmit} id="login_session" action="/api/user" method="POST">
    <h2>Session Creator</h2>
    <p>Name:</p>
    <input type="text" name="nm" />
    <input type="submit" value="Login" onChange={this.handleChange}/>
    </form>
    <Screen />
    </div>
    <div class="right-section">
    <Users />
    <Participants />
    <Chat />
    </div>

    </div>
  );

}
}

export default App;
