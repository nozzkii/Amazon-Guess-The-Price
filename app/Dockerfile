FROM python:3.8
MAINTAINER  "Anh Tai" <anhtai.thai@hotmail.de>
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]
RUN pip3 uninstall flask && pip3 install flask
RUN pip3 uninstall flask-socketio && pip3 install flask-socketio
RUN pip3 uninstall flask_sqlalchemy && pip3 install flask_sqlalchemy
RUN pip3 uninstall pymysql && pip3 install pymysql
RUN pip3 uninstall cryptography && pip3 install cryptography
COPY . /usr/src/app
CMD ["python", "/usr/src/app/main.py"]
