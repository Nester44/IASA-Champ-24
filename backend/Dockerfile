FROM --platform=$BUILDPLATFORM python:3.10-alpine AS builder

WORKDIR /app

COPY requirements.txt /app
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

COPY . /app

ARG GITHUB_TOKEN

RUN apk add curl unzip

RUN curl -vLJO -H "Authorization: token ${GITHUB_TOKEN}" -H "Accept: application/octet-stream" "https://api.github.com/repos/Nester44/IASA-Champ-24/releases/assets/149424122"
RUN unzip models.zip
RUN rm models.zip