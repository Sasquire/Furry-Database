#!/bin/bash
set -e
# cd into json directory

zip -r -9 zips/e621_json.zip e621/ > /dev/null
rm -r e621
mkdir e621

zip -r -9 zips/furry_network.zip furry_network/ > /dev/null
rm -r furry_network
mkdir furry_network