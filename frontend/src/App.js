import React, {Component}from 'react';
import './App.css';
import Users from './Components/users/users'


class App extends Component {



  constructor(props) {
     super(props);
     this.state = {value: ''};
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);

     const title = React.createElement('h1', {}, 'My First React Code');


   }


  handleChange(event) {
    this.setState({value: event.target.value});  }


  handleSubmit(event) {
    console.log("making request")
    fetch("/home", {
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

        this.setState({playerName: json()})
      })

  }

  /*async componentDidMount(){
     fetch('http://localhost:5000/home')
     const response = await fetch(url)
   }*/



render(){
  return (

    <div>
    <form id="login_session" action="/" method="POST" class="formholder">
    <h2>Session Creator</h2>
    <p>Name:</p>
    <input type="text" name="nm" />
    <input type="submit" value="Login" value={this.state.value} onChange={this.handleChange}/>
    </form>
    /*<p>USER: {this.state.user}</p>*/
    <Users />
    </div>

  );

}
}

export default App;
