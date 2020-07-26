    <head>
          <title>{% block title %}Amazon Guess The Price{% endblock %}</title>
        <link rel="stylesheet" href="{{ url_for('static', filename='css/main.css') }}">
        <script src="//cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js" integrity="sha256-yr4fRk/GU1ehYJPAs8P4JlTgu0Hdsp4ZKrx8bDEDC3I=" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="static/js/socket.js"></script>
    </head>
    {% block content %}
      <div class="header">
      <h1>Guess The Price</h1>
      </div>
      <div class="row">
      <div class="left-section">
      <div class="four-column">
      <form id="login_session" action="#" method="POST" class=formholder"">
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
      <div id="img_url" class="screen">
      </div>
      </div>
      <div class="right-section">
    <div>
      {% with messages = get_flashed_messages() %}
      {% if messages %}
      {% for msg in messages %}
      <p class="flash"><b>{{msg}}</b></p>
      {% endfor %}
      {% endif %}
      {% endwith %}
    </div>
    <div class="group">
      {% if user %}
      {% endif%}
      {% for member in group %}
      <p>User {{member.user}}</p>
      {% endfor %}
    </div>
    {% if file_count > 0 %}
    <p>There are {{file_count}} screenshots in /static/img</p>
    {% else %}
    <p>There are 0 screenshots in /static/img</p>
    {% endif %}
    <div class="chatfield">
      <p>{{user}}</p><ul id="messages"></ul>
    </div>
      <input type="text" id="myMessage">
      <button id="sendButton">Send</button>
      <button id="createScreenshot">Generate Screenshot</button>
      <!--<form action = "/newproduct" method = "POST">
      <button id="product">Generate Amazon Product</button>
      </form>-->
    <form action = "" method = "POST">
      <label for="fname">Price:</label><br>
      <input type="text" value="">
      <input type="submit" id="productbutton" value="Send">
    </form>
    <form id="createproduct" action = "#" method = "POST">
      <input type="submit" value="Socket Product">
    </form>
  </div>
    </div>
{% endblock %}
