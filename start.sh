#!/usr/bin/env bash

mkdir -p `pwd`/conf `pwd`/logs
docker run --restart=always -d --name nginx \
  --expose 80 -p 80:80
	-v `pwd`/logs/:/etc/nginx/logs/ \
	\
	-e GZIP=on \
	77tv/nginx:1.18.0
