from flask import Blueprint, render_template, redirect, url_for, request, make_response, flash
from flask_socketio import SocketIO

cookieconf = Blueprint("cookie", __name__, static_folder="static", template_folder="templates")

@cookieconf.route('/setcookie', methods = ['POST', 'GET'])
def setcookie():
    if request.method == 'POST':
        cookie_user = request.form['ck']
        flash(f"Your userID is {cookie_user}")
    resp = make_response(redirect(url_for("home")))
    resp.set_cookie('userID', cookie_user)
    return resp

@cookieconf.route('/getcookie', methods = ['POST', 'GET'])
def getcookie():
    if request.cookies.get('userID') != "":
        name = request.cookies.get('userID')
        flash(f"Your userID is {name}")
        return redirect(url_for("home"))
    else:
        return redirect(url_for("home"))

@cookieconf.route('/deletecookie', methods = ['POST', 'GET'])
def deletecookie():
    if request.cookies.get('userID') != "":
        flash(f"You deleted your cookie")
        resp = make_response(redirect(url_for("home")))
        resp.set_cookie('userID', '', expires=0)
        return resp
    else:
        return redirect(url_for("home"))
