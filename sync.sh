echo "syncing files"
rsync -r ./dest/ pat@104.131.93.234:/usr/share/nginx/html/ --exclude '.DS_Store'
echo "syncing sounds"
rsync -r ./sounds/ pat@104.131.93.234:/usr/share/nginx/html/sounds/ --exclude '.DS_Store'
echo "syncing fav icon"
rsync -r ./fav_icons/ pat@104.131.93.234:/usr/share/nginx/html/fav_icons/ --exclude '.DS_Store'
