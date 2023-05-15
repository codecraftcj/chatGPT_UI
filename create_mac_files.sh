#!/bin/bash

# Change directory to your repository
cd ~/Documents/cj_tests/chatGPT_GUI

# Pull the latest changes from origin
git pull origin

# Run the npm script "make"
npm run make

# Add all changes to the staging area
git add *

# Commit the changes with the specified message
git commit -m "creating mac executable"

# Push the changes to origin
git push origin