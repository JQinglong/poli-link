FROM python:3.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
RUN pip install mysqlclient
ADD . /code/
# CMD python3 manage.py runserver 0.0.0.0:8000
EXPOSE 8000