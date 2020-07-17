import os
import random
from flask import Flask, render_template, redirect, url_for, session, request, make_response, flash
from datetime import timedelta
from flask_mysqldb import MySQL
from flask_socketio import SocketIO, send
from plugin.cookie import cookieconf
from db.sql_data import *

app = Flask(__name__, static_url_path='/static' )
app.register_blueprint(cookieconf, url_prefix="")

app.config["SECRET_KEY"]="jhsdkfhskjdfhskf"
app.config['PERMANENT_SESSION_LIFETIME'] =  timedelta(minutes=5)
app.config['MYSQL_HOST'] = MYSQL_HOST
app.config['MYSQL_USER'] = MYSQL_USER
app.config['MYSQL_PASSWORD'] = MYSQL_PASSWORD
app.config['MYSQL_DB'] = MYSQL_DB

socketio = SocketIO(app)
mysql = MySQL(app)

path, dirs, files = next(os.walk("/usr/src/app/static/img"))
file_count = len(files)
arr = os.listdir('/usr/src/app/static/img')

usersOnlineDisplayNames = []
usersOnlineAvatars = []

#count screenshots


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
@app.route("/home", methods=['POST', 'GET'])
def home():
    path, dirs, files = next(os.walk("/usr/src/app/static/img"))
    file_count = len(files)
    arr = os.listdir('/usr/src/app/static/img')
    if request.method == "POST":
        user = request.form["nm"]
        session["user"] = user
        session.permanent = True
        return redirect(url_for("user"))
    else:
        return render_template("index.php", group=group, file_count=file_count, img_url=request.args.get('img_url'))

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

@app.route("/newproduct", methods = ['POST', 'GET'])
def newproduct():
    global arr
    current_arr = arr
    len_current_arr = len(current_arr)
    if len_current_arr !=0:
        element_number= random.randrange(len_current_arr)
        chosenfile = current_arr[element_number]
        img_url= f"<img src=/static/img/{chosenfile}/>"
        flash(f"Your files {current_arr}, element_number: {element_number}")
        #current_arr.pop(element_number)
        del current_arr[element_number];
        len_current_arr -=1
    elif len_current_arr == 0:
        arr = os.listdir('/usr/src/app/static/img')
        chosenfile = ''
        img_url = f'<h3>No more products to generate</h3>'
    else:
        img_url = f'<h3>Generate Product to start playing</h3>'
    return redirect(url_for("home", img_url=img_url))


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
        send(user + ':<br>' + msg, broadcast=True)
    else:
        send('<span style="background-color:orange; width:100%">You need a session name! Please create a session name.</span>')

@socketio.on('join')
def on_join(data):
    username = session["user"]
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', room=room)

@socketio.on('leave')
def on_leave(data):
    username = session["user"]
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)


@socketio.on_error()        # Handles the default namespace
def error_handler(e):
    pass

@socketio.on_error_default  # handles all namespaces without an explicit error handler
def default_error_handler(e):
    pass

if __name__ == '__main__':
    socketio.run(app.run(debug=True, host='0.0.0.0'))
