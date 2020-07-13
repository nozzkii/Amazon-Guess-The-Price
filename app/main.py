import os
from flask import Flask, render_template, redirect, url_for, session, request, make_response, flash
from random import randrange
from datetime import timedelta
from flask_mysqldb import MySQL
from flask_socketio import SocketIO, send
from plugin.cookie import cookieconf
from db.sql_data import *

app = Flask(__name__)
app.register_blueprint(cookieconf, url_prefix="")

app.config["SECRET_KEY"]="jhsdkfhskjdfhskf"
app.config['PERMANENT_SESSION_LIFETIME'] =  timedelta(minutes=5)
app.config['MYSQL_HOST'] = MYSQL_HOST
app.config['MYSQL_USER'] = MYSQL_USER
app.config['MYSQL_PASSWORD'] = MYSQL_PASSWORD
app.config['MYSQL_DB'] = MYSQL_DB

socketio = SocketIO(app)
mysql = MySQL(app)

usersOnlineDisplayNames = []
usersOnlineAvatars = []

#count screenshots
path, dirs, files = next(os.walk("/usr/src/app/static/img"))
file_count = len(files)

group = [
{
'user': 'Johne doe',
'id': '23'
},
{
'user': 'johne doe',
'id': '43'
}
]


@app.route("/")
def redirecthome():
    return redirect(url_for("home"))
@app.route("/home", methods=["POST", "GET"])
def home():
    if request.method == "POST":
        user = request.form["nm"]
        session["user"] = user
        session.permanent = True
        return redirect(url_for("user"))
    else:
        return render_template("index.php", group=group, file_count=file_count)

@app.route("/lobby")
def lobby():
    if "user" in session:
        user = session["user"]
        message = f"<p>You are logged in as {user}</p>"
        return render_template("lobby.php", message=message)
    else:
        message = f"<p>You are not logged in</p>"
        return render_template("lobby.php", message=message)

@app.route("/letsplay")
def letsplay():
    return render_template("letsplay.php")

@app.route("/user")
def user():
    if "user" in session:
        user = session["user"]
        flash(f"You are logged in as {user}")
        return redirect(url_for("home"))
    else:
        return redirect(url_for("lobby"))

@app.route("/logout", methods = ['POST', 'GET'])
def logout():
    session.pop("user", None)
    flash("You have been logged out")
    return redirect(url_for("home"))

@socketio.on('message')
def handleMessage(msg):
    if "user" in session:
        user = session["user"]
        print('Message: ' + msg)
        send(user + ': ' + msg, broadcast=True)
    else:
        send('You need a session name! Please create a session name.')

@socketio.on_error()        # Handles the default namespace
def error_handler(e):
    pass

@socketio.on_error_default  # handles all namespaces without an explicit error handler
def default_error_handler(e):
    pass

if __name__ == '__main__':
    socketio.run(app.run(debug=True, host='0.0.0.0'))
