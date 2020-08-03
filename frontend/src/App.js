import React, {Component} from 'react';
import './App.css';
import Users from './Components/users/users'
import Participants from './Components/participants/participants'


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
    <div>
    <form id="login_session" action="/api/user" method="POST" onSubmit={this.handleSubmit}>
    <h2>Session Creator</h2>
    <p>Name:</p>
    <input type="text" name="nm" />
    <input type="submit" value="Login" onChange={this.handleChange}/>
    </form>
    <Users />
    <Participants />
    </div>
  );

}
}

export default App;
