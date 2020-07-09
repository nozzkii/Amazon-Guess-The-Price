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
      <script></script>
      <div class="header">
      <h1>Guess The Price</h1>
      </div>
      <div class="row">
      <div class="left-section">
      <div class="four-column">
      <form action="#" method="POST" class=formholder"">
      <h2>Session Creator</h2>
      <p>Name:</p>
      <input type=text name="nm"/>
      <input type=submit value="Login"/>
      </form>
      </div>
      <div class="four-column">
      <form action = "/setcookie" method = "POST">
      <h2>Cookie Creator</h2>
      <p>Enter User-ID</p>
      <input type = 'text' name = 'ck'/>
      <input type = 'submit' value = 'Login'/>
      </form>
      </div>
      <div class="four-column">
      <form action = "/logout" method = "POST">
      <h2>Logout from Session</h2>
      <input type=submit value="Logout"/>
      </form>
      </div>
      <div class="four-column">
      <form action = "/getcookie" method = "POST">
      <h2>Get Cookie</h2>
      <input type=submit value="Get Cookie"/>
      </form>
      </div>
      <form action = "/deletecookie" method = "POST">
      <h2>Delete Cookie</h2>
      <input type=submit value="Delete Cookie"/>
      </form>
      </div>
      <div class="right-section">
    <div class="group">
      {% for member in group %}
      <p>User {{member.user}}</p>
      {% endfor %}
    </div>
    <div>
    </div>
    <div class="chatfield">

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
