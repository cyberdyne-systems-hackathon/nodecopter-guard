#!/bin/bash

# First, get the zip file
cd /path/to/put/zip/file && wget -O downloadedmaster.zip -q https://github.com/cyberdyne-systems-hackathon/nodecopter-guardarchive/master.zip

# Second, unzip it, if the zip file exists
if [ -f /path/to/put/zip/file/downloadedmaster.zip ]; then
    # Unzip the zip file
    unzip -q /path/to/put/zip/file/downloadedmaster.zip

    # Delete zip file
    rm /path/to/put/zip/file/downloadedmaster.zip

    # Rename project directory to desired name
    mv Project-master somesite.com

    # Delete current directory
    rm -rf /var/www/somesite.com

    # Replace with new files
    mv somesite.com /var/www/

    # Perhaps call any other scripts you need to rebuild assets here
    # or set owner/permissions
    # or confirm that the old site was replaced correctly
fi