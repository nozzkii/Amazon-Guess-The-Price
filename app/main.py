import os
import random
import pymysql
from flask import Flask, jsonify, render_template, redirect, url_for, session, request, make_response, flash
from datetime import timedelta
from flask_socketio import SocketIO, send
from plugin.cookie import cookieconf
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


#eventlet.monkey_patch()
app = Flask(__name__, static_url_path='/static')
CORS(app, resources=r'/api/*')
app.register_blueprint(cookieconf, url_prefix="")

#connection = mysql.connector.connect(user=MYSQL_USER, password= MYSQL_PASSWORD, host=MYSQL_HOST, port='3306', database=MYSQL_DB)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["SECRET_KEY"] = "jhsdkfhskjdfhskf"
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:test@db-data/mydb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    score = db.Column(db.Integer, nullable=True)

    def __init__(self, username, score):
        self.username = username
        self.score = score

    def __repr__(self):
        return '<User %r>' % self.username

class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(500), nullable=False)


db.create_all()


socketio = SocketIO(app)

path, dirs, files = next(os.walk("/usr/src/app/static/img"))
file_count = len(files)
arr = os.listdir('/usr/src/app/static/img')

usersOnlineDisplayNames = []
usersOnlineAvatars = []

clients = []

# count screenshots

'''def timeout():
    console.log("Generate next product to start a new round")

def startTimer():
    #duration is in seconds
    t = Timer(1 * 10, timeout)
    t.start()
    for i in range(10):
        interval = str(10-i) + " seconds remaining"
        time.sleep(1)
    t.join()'''



@app.route("/api")
def api():
    return{
    'userid': 1,
    'title': 'Flask react application',
    }

participant = [
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
    global file_count
    global arr
    interval = ""
    messages=History.query.all()
    #startTimer()
    if request.method == "POST" and request.form['nm'] != 0 :
        user = request.form["nm"]
        session["user"] = user
        session.permanent = True
        #return jsonify(user)
        return redirect(url_for("user"))
    else:
        return render_template("index.html", group=participant, file_count=file_count, img_url=request.args.get('img_url'), messages=messages, interval=interval)


@app.route("/lobby")
def lobby():
    if "user" in session:
        user = session["user"]
        notification = f"<p>You are logged in as {user}</p>"
        return render_template("lobby.html", notification=notification)
    else:
        notification = f"<p>You are not logged in</p>"
        return render_template("lobby.html", notification=notification)


@app.route("/letsplay")
def letsplay():
    return render_template("letsplay.html")


@app.route("/user")
def user():
    if "user" in session:
        user = session["user"]
        flash(f"You are logged in as {user}")
        return redirect(url_for("home"))
    else:
        return redirect(url_for("lobby"))

@app.route("/logout", methods=['POST', 'GET'])
def logout():
    session.pop("user", None)
    flash("You have been logged out")
    return redirect(url_for("home"))


@socketio.on('screenshot', namespace='/')
#@app.route("/newproduct", methods=['POST', 'GET'])
def newproduct():
    global arr
    current_arr = arr
    len_current_arr = len(current_arr)
    if len_current_arr != 0:
        element_number = random.randrange(len_current_arr)
        chosenfile = current_arr[element_number]
        img_url = f"<img src=/static/img/{chosenfile}/>"
        #socketio.send('screenshot', img_url, broadcast = True)
        socketio.emit('screenshot', {'img_url': img_url}, broadcast=True)
        flash(f"Your files {current_arr}, element_number: {element_number}")
        # current_arr.pop(element_number)
        del current_arr[element_number]
        len_current_arr -= 1
        return redirect(url_for("home", img_url=img_url))
    elif len_current_arr == 0:
        arr = os.listdir('/usr/src/app/static/img')
        chosenfile = ''
        img_url = f'<h3>No more products to generate</h3>'
        socketio.emit('screenshot', {'img_url': img_url}, broadcast=True)
    else:
        img_url = f'<h3>Generate Product to start playing</h3>'
        socketio.emit('screenshot', {'img_url': img_url}, broadcast=True)
    #return redirect(url_for("home", img_url=img_url))


@socketio.on('message', namespace='/')
def handleMessage(msg):
    if "user" in session:
        user = session["user"]
        print('Message: ' + msg)
        send(user + ':<br>' + msg, broadcast=True)
        message = History(message=msg)
        db.session.add(message)
        db.session.commit()
        console.log("sent db values")
    else:
        send('<span style="background-color:orange; width:100%">You need a session name! Please create a session name.</span>')

@socketio.on('join', namespace='/')
def on_join(data):
    username = session["user"]
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', room=room)


@socketio.on('leave', namespace='/')
def on_leave(data):
    username = session["user"]
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)

@socketio.on('connect', namespace='/')
def on_connect():
    print('connected')
    clients.append(request.sid)

@socketio.on('disconnect', namespace='/')
def on_disconnect():
    print('Client disconnected')


@socketio.on_error()        # Handles the default namespace
def error_handler(e):
    pass


@socketio.on_error_default  # handles all namespaces without an explicit error handler
def default_error_handler(e):
    pass


@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request. %s', e)
    return "An internal error occured", 500

@app.route('/api/user', methods=['POST', 'GET'])
def api_user():
    if request.method == "POST" and request.form['nm'] != 0 :
        user = request.form["nm"]
        session["user"] = user
        session.permanent = True
        #return jsonify(user)
        return jsonify({'user' : session["user"]})

@app.route('/api/participant', methods=['POST', 'GET'])
def api_participant():
    global participant
    return jsonify(participant)


if __name__ == '__main__':
    socketio.run(app.run(debug=True, host='0.0.0.0', threaded=True))
