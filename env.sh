#!/bin/bash

# This script conditionally starts container
# build it if it doesn't exist
# creates a mount if it doesn't exist
# and starts it
# start the mount if it exists and run this script again

# mounts this dirrectory to /app

app_name="personal_page"
app_container=$(docker ps | grep $app_name | awk '{print $1}')
npm_modules_path="/Users/emomkus/Desktop/code/npm_modules"
npm_modules_provider="@edvinas1122"

if [ -z "$app_container" ]
then
	echo "No $app_name container found. Creating one..."
	docker run \
		--name $app_name \
		-it \
		-p 3000:3000 \
		-v $(pwd)/:/app/ \
		-v $npm_modules_path:/app/local_modules/$npm_modules_provider \
		$app_name /bin/bash
	exit 0
else
	echo "Found $app_name container: $app_container"
	docker exec -it $app_container /bin/bash
fi