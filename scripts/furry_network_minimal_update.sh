#!/bin/bash
# cd into the correct directory

# Update the posts from FurryNetwork
node main.js -s furry_network -c minimal "$1"

# Clear the database of images that didnt download last time
PGPASSWORD=PASSWORD psql \
	-U USERNAME \
	-h localhost \
	-d furry \
	-c "update fn.files set status = null where status = '500';"

# Download images right after
node main.js -s furry_network -c images