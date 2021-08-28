#!/usr/bin/env bash

mkdir -p `pwd`/logs
docker run --restart=always -d --name platform-admin-vue \
  --expose 80 -p 80:80
	-v `pwd`/logs/:/etc/nginx/logs/ \
	\
	-e GZIP=on \
	77tv/platform-admin-vue:latest
