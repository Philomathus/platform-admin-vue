#!/usr/bin/env bash
docker kill --signal=SIGQUIT platform-admin-vue

docker rm -f platform-admin-vue
