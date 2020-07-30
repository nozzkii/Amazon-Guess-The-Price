FROM python:3.8
MAINTAINER  "Anh Tai" <anhtai.thai@hotmail.de>
RUN ["apt-get", "update"]
RUN python -m pip install --upgrade pip
RUN pip3 uninstall flask && pip3 install flask==1.1.2
RUN pip3 uninstall flask-socketio && pip3 install flask-socketio==4.3.1
RUN pip3 uninstall flask_sqlalchemy && pip3 install flask_sqlalchemy==2.4.4
RUN pip3 uninstall pymysql && pip3 install pymysql==0.10.0
RUN pip3 uninstall cryptography && pip3 install cryptography==3.0
COPY . /usr/src/app
CMD ["python", "/usr/src/app/main.py"]
