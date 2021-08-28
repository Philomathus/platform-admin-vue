#!/usr/bin/env bash
docker kill --signal=SIGQUIT nginx

docker rm -f nginx