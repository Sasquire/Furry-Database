#!/bin/bash
# cd into the correct directory

# Update the posts from e621
node main.js -s e621 -c minimal >> ./logs/e621.txt 2>&1

# Clear the database of images that didnt download last time
PGPASSWORD=PASSWORD psql \
	-U USERNAME \
	-h localhost \
	-d furry \
	-c "update e621.files set status = null where status = 'Erro' or status = '522';" \
	>> ./logs/images.e621.txt 2>&1

# Download images right after
node main.js -s e621 -c images >> ./logs/images.e621.txt 2>&1