source .env

HOST="$SSH_USER@$DOMAIN"

rsync -avh --delete --exclude=node_modules/ --exclude=.git/ --exclude=dist/ --exclude=static/ . $HOST:$APP_DIR/app
rsync -avh --delete static/ $HOST:$WWW_DIR

COMMAND="cd $APP_DIR"
COMMAND="$COMMAND && cp .env app/"
COMMAND="$COMMAND && cd app/"
COMMAND="$COMMAND && yarn install"
COMMAND="$COMMAND && yarn build"
COMMAND="$COMMAND && pm2 startOrRestart ecosystem.config.js --update-env"

ssh -t $HOST "$COMMAND"

echo
echo 'Setting Telegram webhook'
curl "https://api.telegram.org/bot$TELEGRAM_SECRET/setWebhook" -F "url=https://$DOMAIN/telegram-hook/$TELEGRAM_SECRET"