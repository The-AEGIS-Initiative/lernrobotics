#!/bin/bash
####################################
#
# Deploy docker image to heroku
#
####################################

# Login
heroku login

# Authenticate docker with heroku docker repo
docker login --username=_ --password=$(heroku auth:token) registry.heroku.com

# Tag docker image with path to heroku repo
docker tag kevinkqi/robobot-frontend:latest registry.heroku.com/robobot-react-app/web

# Push docker image to heroku docker repo
docker push registry.heroku.com/robobot-react-app/web

# Release new docker image
heroku container:release web -a robobot-react-app