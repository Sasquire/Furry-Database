# About

I wanted an automated system for keeping track of posts on e621 for analysis of sources, tags, scores, and users. This program does that for a few different sites. It gets expanded to include more whenever I am in the mood.

# Supported Sites
* e621
* ~~FurryNetwork~~
* FurAffinity *coming soon* 
* InkBunny *coming soon*
* SoFurry *coming soon*
* Weasyl *coming soon*
* Twitter (from an artist list) *coming soon*
* Reddit (from a user/subreddit list) *coming soon*
* Patreon *coming soon*
* Pixiv (Maybe?) *coming soon*
* Instagram (Maybe?) *coming soon*
* Tumblr *coming soon*

# Setup
This was designed to be run 100% inside the docker container. I have no idea if/how it runs outside of the container. You will have to mess with things and get it to work on your own. On the bright side, installation should be as easy as cloning this repository and starting the docker container!

# Documentation
TODO

# License
This program is licensed under the Unlicense. Do with it whatever you want.

#### Notes to self
* `docker-compose down && docker-compose build && docker-compose up -d`
* `docker exec -it furry_database_postgres psql -U admin -W -d furry`
