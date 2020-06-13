#!/bin/bash
set -e
# cd /path/to/dump/folder

today=$(date -I)
today_file=$today.tar
today_path="./daily/${today_file}"
PGPASSWORD=PASSWORD pg_dump -U USERNAME -h localhost -Z9 -Fc DATABASENAME > $today_path

date_name=$(date +%a)
if [ $date_name == "Sun" ]
then
	weekly_path="./weekly/${today_file}"
	cp $today_path $weekly_path
	rm ./daily/*.tar
fi