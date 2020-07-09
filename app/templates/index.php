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
      <div class="header">
      <h1>Guess The Price</h1>
      </div>
      <div class="row">
      <div class="left-section">
      <div class="four-column">
      <h2>Session Creator</h2>
      <form action="#" method="POST" class=formholder"">
      <p>Name:</p>
      <input type=text name="nm"/>
      <input type=submit value="Login"/>
      </form>
      </div>
      <div class="four-column">
      <h2>Cookie Creator</h2>
      <form action = "/setcookie" method = "POST">
      <p>Enter User-ID</p>
      <input type = 'text' name = 'ck'/>
      <input type = 'submit' value = 'Login'/>
      </form>
      </div>
      <div class="four-column">
      <h2>Logout from Session</h2>
      <form action = "/logout" method = "POST">
      <input type=submit value="Logout"/>
      </form>
      </div>
      <div class="four-column">
      <h2>Get Cookie</h2>
      <form action = "/getcookie" method = "POST">
      <input type=submit value="Get Cookie"/>
      </form>
      </div>
      </div>
      <div class="right-section">
    <div class="group">
      {% for member in group %}
      <p>User {{member.user}}</p>
      {% endfor %}
    </div>
    <div>
      <form action = "/msg" method = "POST">
        <input type=submit value="Send message"/>
        <input type="text" name="msg"/>
      </form>
    </div>
  </div>
    <p>{{usr}}</p>
    </div>
    </body>
</html>
