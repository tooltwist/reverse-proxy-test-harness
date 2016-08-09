#!/bin/bash
#
#	Build a Docker container and run it
#
docker rm -f mysite

docker build -t mysite . \
&& docker run --name mysite -p 8080:80 -d -v `pwd`/site:/var/www/site mysite
