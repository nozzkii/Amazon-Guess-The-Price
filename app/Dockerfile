FROM python:3.8
RUN pip3 uninstall flask && pip3 install flask
RUN pip3 uninstall flask-restful && pip3 install flask-restful
RUN pip3 uninstall flask-socketio && pip3 install flask-socketio
COPY . /usr/src/app
CMD ["python", "/usr/src/app/api.py"]
