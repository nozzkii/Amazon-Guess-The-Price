FROM python:3.8
MAINTAINER  "Anh Tai" <anhtai.thai@hotmail.de>
RUN ["apt-get", "update"]
RUN ["python3 ", "-m", "pip", "install", "--upgrade", "pip"]
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY requirements.txt /usr/src/app/
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . /usr/src/app
CMD ["python", "/usr/src/app/main.py"]
