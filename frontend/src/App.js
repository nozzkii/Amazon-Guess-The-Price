import React from 'react';
import './App.css';

function App() {
  return (
    <form id="login_session" action="http://localhost:5000/home" method="POST" class="formholder">
    <h2>Session Creator</h2>
    <p>Name:</p>
    <input type="text" name="nm"/>
    <input type="submit" value="Login"/>
    </form>
  );
}

export default App;
