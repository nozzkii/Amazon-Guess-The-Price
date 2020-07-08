{% block title %}{{title}}{% endblock %}
{% block content %}
<h2>Session Creator</h2>
<form action="#" method="POST">
<p>Name:</p>
<p><input type=text name="nm"/></p>
<p><input type=submit value="submit"/></p>
</form>
<br><br><br><br>
<h2>Cookie Creator</h2>
<form action = "/setcookie" method = "POST">
<p>Enter User-ID</p>
<p><input type = 'text' name = 'ck'/></p>
<p><input type = 'submit' value = 'Login'/></p>
</form>
<br><br><br><br>
<p>Logout from Session</p>
<p><input type=submit value="Logout"/></p>
{% endblock %}
