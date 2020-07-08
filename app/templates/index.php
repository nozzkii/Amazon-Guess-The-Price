<?php
session_start();
$error='';
?>
<html>
    <head>
        <title>Amazon Guess The Price</title>
        <link rel="stylesheet" href="{{ url_for('static', filename='css/main.css') }}">
    </head>
    <body>
      <h1>Guess The Price</h1>
      {% for post in posts %}
      <h1>hi</h1>
      <p>By {{post.author}}</p>
      {% endfor %}
      <div id="wrap">
<div id="regbar">
  <div id="navthing">
    <h2><a href="#" id="loginform">Login</a> | <a href="#">Register</a></h2>
  <div class="login">
    <div class="arrow-up"></div>
    <div class="formholder">
      <div class="randompad">
         <fieldset>
           <label name="email">Email</label>
           <input type="email" value="example@example.com" />
           <label name="password">Password</label>
           <input type="password" />
           <input type="submit" value="Login" />

         </fieldset>
      </div>
    </div>
  </div>
  </div>
</div>
</div>

    </body>
</html>
