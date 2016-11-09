#!/bin/bash
#                   _     _           _
#   _ _ _ ___ ___ _| |___| |___ _ _ _| |
#  | | | | . |  _| . |  _| | . | | | . |
#  |_____|___|_| |___|___|_|___|___|___|
#
#  2016 © Calvin Reibenspieß <calvinreibenspiess@gmail.com>  
#
#  Generates a wordcloud with the most important words from a text.
#  $1 textName
#  $2 wordcloudOutputName
#  $3 wordcloudResolution
#  $4 textMostImportantTagsQuantity
#  $5 textStopWords
#  
#  See for additional informations:
#   - https://github.com/Vailfire/wordcloud/tree/bash
#   - https://github.com/Vailfire/wordcloud/blob/docs/README.md

if [ -z "$1" ]; then
 echo "A text needs to be passed to generate a wordcloud."
 exit 1
fi

WORDCLOUD_OUTPUT_NAME=${2-'wordcloud.png'}
TEXT_NAME=$1
TEXT_MOST_IMPORTANT_TAGS_QUANTITY=${4-10}
TEXT_STOP_WORDS=${5-'stopWords.txt'}

WORDCLOUD_RESOLUTION=${3-'1024x768'}
SIZE_X=$(echo $WORDCLOUD_RESOLUTION | cut -dx -f1)
SIZE_Y=$(echo $WORDCLOUD_RESOLUTION | cut -dx -f2)

echo "                  _     _           _ "
echo "  _ _ _ ___ ___ _| |___| |___ _ _ _| |"
echo " | | | | . |  _| . |  _| | . | | | . |"
echo " |_____|___|_| |___|___|_|___|___|___|"
echo "                                      "
echo " 2016 © Calvin Reibenspieß <calvinreibenspiess@gmail.com>"  
echo "                                      "

echo "=> Passed arguments"
echo "  - TEXT_NAME:" $TEXT_NAME
echo "  - WORDCLOUD_OUTPUT_NAME:" $WORDCLOUD_OUTPUT_NAME
echo "  - WORDCLOUD_RESOLUTION:" $WORDCLOUD_RESOLUTION
echo "  - TEXT_MOST_IMPORTANT_TAGS_QUANTITY:" $TEXT_MOST_IMPORTANT_TAGS_QUANTITY
echo "  - TEXT_STOP_WORDS:" $TEXT_STOP_WORDS

echo "=> Generating a wordcloud with" $SIZE_X "px width and" $SIZE_Y "px height."

echo "=> Downloading additional dependencies..."

# Filter most important words with external distributed script

mkdir /tmp/wordcloud
curl --progress-bar https://raw.githubusercontent.com/google/fonts/master/ofl/oswald/Oswald-Regular.ttf > /tmp/wordcloud/Oswald-Regular.ttf

IMPORTANTWORDS="$(curl -s https://gist.githubusercontent.com/Vailfire/f0dee6d2ef505a621fbb1cfc02fdd14a/raw/7b32a010a824b2744ca76d865ccfef20cbe760b9/filterMostImportantTags.sh | sh -s $TEXT_NAME $TEXT_STOP_WORDS $TEXT_MOST_IMPORTANT_TAGS_QUANTITY)"

# COMPOSING

echo "=> Composing words ..."

COMPOSEDWORDS=()

ROTATIONS=(0 90)

COUNT=0

# Specify margins so the text does hopefully not overlap with the image borders
SIZE_X_OFFSET=$(($SIZE_X / 5))
SIZE_Y_OFFSET=$(($SIZE_Y / 5))
SIZE_X_GAPPED=$(($SIZE_X - $SIZE_X / 5))
SIZE_Y_GAPPED=$(($SIZE_Y - $SIZE_Y / 5))

for word in $IMPORTANTWORDS; do
    
    # calculate individual font size
    POINT_SIZE=$(($SIZE_Y / 3 / ($COUNT+1) + 15))
    
    # calculate rotation and angle back to origin
    ROTATION=${ROTATIONS[$RANDOM % ${#ROTATIONS[@]}]}
    FILL_ROTATION=$((360 - $ROTATION))

    if (( COUNT % 2 )); then
        COMPOSEDWORDS+=("
        -pointsize $POINT_SIZE \
        -rotate $ROTATION \
        -annotate +$( shuf -i ${SIZE_X_OFFSET}-${SIZE_X_GAPPED} -n 1 )+$( shuf -i ${SIZE_Y_OFFSET}-${SIZE_Y_GAPPED} -n 1 ) \
        ${word} \
        -rotate $FILL_ROTATION \
        ")
        echo " " ${COMPOSEDWORDS[-1]}
    fi    
    ((COUNT+=1))
done

echo "=> Composed. Generating wordcloud image ..."

convert -size $WORDCLOUD_RESOLUTION xc:black -fill white -gravity SouthWest -font "/tmp/wordcloud/Oswald-Regular.ttf" ${COMPOSEDWORDS[@]} $WORDCLOUD_OUTPUT_NAME

echo "=> Complete! Wordcloud generated at '" $WORDCLOUD_OUTPUT_NAME "'."