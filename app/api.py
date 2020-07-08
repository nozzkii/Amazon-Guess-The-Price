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
@app.route("/home")
def home():
    return render_template("index.php", group=group)

@app.route("/lobby", methods=["POST", "GET"])
def lobby():
    if request.method == "POST":
        user = request.form["nm"]
        session["user"] = user
        return redirect(url_for("user"))
    else:
        return render_template("lobby.php")

@app.route("/letsplay")
def letsplay():
    return render_template("letsplay.php")

@app.route("/user")
def user():
    if "user" in session:
        user = session["user"]
        return f"<h1>{user}</h1>"
    else:
        return redirect(url_for("lobby"))

@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for("lobby"))

@app.route('/setcookie', methods = ['POST', 'GET'])
def setcookie():
    if request.method == 'POST':
        user = request.form['ck']
    resp = make_response(render_template('readcookie.html'))
    resp.set_cookie('userID', user)
    return resp

@app.route('/getcookie')
def getcookie():
    name = request.cookies.get('userID')
    return '<h1>welcome ' + name + '</h1>'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
