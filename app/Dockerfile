FROM python:3.8
MAINTAINER  "Anh Tai" <anhtai.thai@hotmail.de>
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]
RUN pip3 uninstall flask && pip3 install flask
RUN pip3 uninstall flask-socketio && pip3 install flask-socketio
RUN pip3 uninstall sqlalchemy && pip3 install sqlalchemy
COPY . /usr/src/app
CMD ["python", "/usr/src/app/main.py"]
