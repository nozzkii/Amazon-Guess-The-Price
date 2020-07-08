FROM python:3.8
RUN pip uninstall flask && python -m pip install flask
RUN pip uninstall flask-restful && pip install flask-restful
RUN pip uninstall flask-socketio && pip install flask-socketio
COPY . /usr/src/app
CMD ["python", "/usr/src/app/api.py"]
