import app

@app.route('/setcookie', methods = ['POST', 'GET'])
def setcookie():
    if request.method == 'POST':
        cookie_user = request.form['ck']
        flash(f"Your userID is {cookie_user}")
    resp = make_response(redirect(url_for("home")))
    resp.set_cookie('userID', cookie_user)
    return resp

@app.route('/getcookie', methods = ['POST', 'GET'])
def getcookie():
    if request.cookies.get('userID') != "":
        name = request.cookies.get('userID')
        flash(f"Your userID is {name}")
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
