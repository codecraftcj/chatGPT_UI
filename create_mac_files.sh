#!/bin/bash


# Pull the latest changes from origin
git pull origin

# Run the npm script "make"
npm update
npm run make

# Add all changes to the staging area
git add *

# Commit the changes with the specified message
git commit -m "creating mac executable"

# Push the changes to origin
git push origin

clear

echo "Mac files created Pa-upload nung out folder sa https://drive.google.com/drive/folders/1mzlPJoYKGb6HElIGXrmO7JkoNkVeMNmw?usp=sharing"