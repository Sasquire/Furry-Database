# About

I wanted an automated system for keeping track of posts on e621 for analysis of sources, tags, scores, and users. This program does that for a few different sites. It gets expanded to include more whenever I am in the mood.

# Setup
Prerequisites:
* [Postgresql](https://www.postgresql.org/) (10 or higher)
* [NodeJS](https://nodejs.org/en/) (14 or higher)

After those are installed and setup you can download the repository with `git clone https://github.com/Sasquire/Furry-Database.git`.

Next copy `sample_options.json` to `options.json`. This is where all of the settings for the application are managed. You will want to configure these values making them appropriate to your setup.

# Documentation

Updating posts and downloading images can be done through the `main.js` file. When you run the program you will need to specify a site (`-s` option) and a command (`-c` option). An example command is `node main.js -s e621 -c images`. Some commands will take extra parameters.

A `--debug=<level>` option is available and will change the verbosity of outputs. The acceptable options are
* `error` Will only output error messages
* `info` The default logging level. Enough to tell you what is happening
* `debug` More information than info, but extremely mundane details are left out
* `all` Any and all log outputs

Here is a list of all commands. Do not expect it to be comprehensive. If you want a comprehensive list of available commands, running the `main.js` file with a site selected will tell you the commands available and running without a site selected will tell you the sites available.

* `-s maintenance`
  * `-c every` Runs the init scripts leaving an empty database
  * `-c check_all_files` Checks files and ensures their md5 and name match
  * `-c create_folders` Creates the image folders structure
  * `-c "don't do this it drops the db"` Literally drops the database, irreversibly destroying any data you had stored. (images, logs, and json remain saved to disk).
* `-s e621`
  * `-c minimal` Refreshes the database with recent updates
  * `-c bulk` Tries to download every post
  * `-c images` Downloads images of posts stored in database
  * `-c import_json path/to/folder` Loads database from stored JSON files
  * `-c import_md5_csv path/to/file.csv` Loads file statuses from a csv
* `-s furry_network`
  * `-c minimal bearer` Refreshes the database with recent updates
  * `-c typed_bulk bearer type [starting_page]` Tries to download every post of \<type\> starting at \<starting_page\>
  * `-c images` Download images of posts stored in database
  * `-c import_json path/to/folder` Loads database from stored JSON files
  * `-c import_md5_csv path/to/file.csv` Loads file statuses from a csv

# Notes
The e621 bulk download lacks a starting id parameter because when I tested it, I was able to download all posts in one go. The FurryNetwork ones does have a starting page parameter because every hour the bearer token updates and you will need to reacquire it.

There are a few scripts that I use to maintain the database. I run these on an automated schedule with crontab, reducing the amount of effort required. They will need setup on your behalf before they can function how they are supposed to.

# License
This program is licensed under the Unlicense. Do with it whatever you want.