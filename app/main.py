from flask import Flask, render_template, redirect, url_for, session, request, make_response, flash
from random import randrange
from datetime import timedelta
from flask_mysqldb import MySQL
from flask_socketio import SocketIO, send

app = Flask(__name__)

app.config["SECRET_KEY"]="jhsdkfhskjdfhskf"
app.config['PERMANENT_SESSION_LIFETIME'] =  timedelta(minutes=5)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'test'
app.config['MYSQL_DB'] = 'amazon'

socketio = SocketIO(app)
mysql = MySQL(app)

usersOnlineDisplayNames = []
usersOnlineAvatars = []

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
        return render_template("index.php", group=group)

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

@app.route('/setcookie', methods = ['POST', 'GET'])
def setcookie():
    if request.method == 'POST':
        cookie_user = request.form['ck']
        flash(f"You are logged in as {cookie_user}")
    resp = make_response(redirect(url_for("home")))
    resp.set_cookie('userID', cookie_user)
    return resp

@app.route('/getcookie', methods = ['POST', 'GET'])
def getcookie():
    if request.cookies.get('userID') != "":
        name = request.cookies.get('userID')
        flash(f"You are logged in as {name}")
        return redirect(url_for("home"))
    else:
        return redirect(url_for("home"))

@app.route('/deletecookie', methods = ['POST', 'GET'])
def deletecookie():
    if request.cookies.get('userID') != "":
        flash(f"You deleted your cookie")
        resp = make_response(redirect(url_for("home")))
        resp.set_cookie('userID', '', expires=0)
        return resp
    else:
        return redirect(url_for("home"))

@socketio.on('message')
def handleMessage(msg):
    print('Message: ' + msg)
    send(msg, broadcast=True)

if __name__ == '__main__':
    socketio.run(app.run(debug=True, host='0.0.0.0'))
