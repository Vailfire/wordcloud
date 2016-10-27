#!/bin/bash
#                   _     _           _
#   _ _ _ ___ ___ _| |___| |___ _ _ _| |
#  | | | | . |  _| . |  _| | . | | | . |
#  |_____|___|_| |___|___|_|___|___|___|
#
#  2016 © Calvin Reibenspieß <calvinreibenspiess@gmail.com>  

echo Downloading binary files ...
curl --progress-bar https://raw.githubusercontent.com/Vailfire/wordcloud/master/dist/wordcloud.bin > /tmp/wordcloud.bin
echo Done! Starting wordcloud ...
chmod +x /tmp/wordcloud.bin
/tmp/wordcloud.bin