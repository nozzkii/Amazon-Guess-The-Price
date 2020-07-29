FROM python:3.8
MAINTAINER  "Anh Tai" <anhtai.thai@hotmail.de>
RUN apt-get update
RUN apt-get install -y vim
RUN python -m pip install --upgrade pip
COPY requirements.txt ./usr/src/app/requirements.txt
WORKDIR /usr/src/app/
RUN pip3 install -r requirements.txt
COPY . /usr/src/app
CMD ["python", "/usr/src/app/main.py"]
