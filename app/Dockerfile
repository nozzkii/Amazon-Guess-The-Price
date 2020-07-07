FROM python:3.8
RUN pip uninstall flask && python -m pip install flask
RUN pip uninstall flask-restful && pip install flask-restful
COPY . /usr/src/app
CMD ["python", "/usr/src/app/api.py"]
