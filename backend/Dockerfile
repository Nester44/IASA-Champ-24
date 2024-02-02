FROM --platform=$BUILDPLATFORM python:3.10 AS builder

WORKDIR /app

COPY requirements.txt /app
RUN --mount=type=cache,target=/root/.cache/pip \
	pip3 install -r requirements.txt

COPY . /app

ARG GITHUB_TOKEN

RUN curl -vLJO "https://github.com/Nester44/IASA-Champ-24/releases/download/v1.0.0-models/models.zip"
RUN unzip models.zip
RUN rm models.zip