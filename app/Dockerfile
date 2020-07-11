FROM python:3.8
MAINTAINER  "Anh Tai" <anhtai.thai@hotmail.de>
RUN pip3 uninstall flask && pip3 install flask
RUN pip3 uninstall flask-socketio && pip3 install flask-socketio
RUN pip3 uninstall flask_mysqldb && pip3 install flask_mysqldb
COPY . /usr/src/app
CMD ["python", "/usr/src/app/main.py"]
