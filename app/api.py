# Product Service

# Import framework
from flask import Flask, render_template, redirect, url_for

# Instantiate the app
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.php")

@app.route("/lobby")
def lobby():
    return render_template("lobby.html")

@app.route("/letsplay")
def letsplay():
    return render_template("letsplay.html")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
