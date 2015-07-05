echo "syncing files"
rsync -r ./dest/ pat@104.131.93.234:/usr/share/nginx/html/ --exclude '.DS_Store'
echo "syncing sounds"
rsync -r ./sounds/ pat@104.131.93.234:/usr/share/nginx/html/sounds/ --exclude '.DS_Store'
echo "syncing external libs"
rsync ./node_modules/normalize.css/normalize.css pat@104.131.93.234:/usr/share/nginx/html/node_modules/normalize.css/normalize.css
