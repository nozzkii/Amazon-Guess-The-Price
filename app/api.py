from flask import Flask, render_template, redirect, url_for, session, request, make_response

app = Flask(__name__)
app.secret_key="jhsdkfhskjdfhskf"

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
        return f"<h1>You are logged in as {user}</h1>"
    else:
        return redirect(url_for("lobby"))

@app.route("/logout", methods = ['POST', 'GET'])
def logout():
    session.pop("user", None)
    return redirect(url_for("home"))

@app.route('/setcookie', methods = ['POST', 'GET'])
def setcookie():
    if request.method == 'POST':
        user = request.form['ck']
    resp = make_response(render_template('readcookie.html'))
    resp.set_cookie('userID', user)
    return resp
    redirect(url_for("home"))

@app.route('/getcookie', methods = ['POST', 'GET'])
def getcookie():
    if request.cookies.get('userID') != "":
        name = request.cookies.get('userID')
        return f'<h1>You are logged in as {name}</h1>'
    else:
        return redirect(url_for("home"))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
