# GitHub Telegram Notifications
A simple Node.js Express server that receives GitHub notifications with a webhook and formats and sends them to Telegram.

## Using with Paul the Office Dog (easier)
- Add [Paul the Office Dog](https://t.me/PaulTheOfficeDogBot) to your Telegram group
- Add a webhook to your GitHub respository/organization according to Paul's instructions
  
## Running your own instance (more private)
- Get a server.
- Get a domain/subdomain pointing to that server, so you can set up HTTPS for the webhooks.
- Configure a HTTPS reverse proxy with [e.g. Nginx and Certbot](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04).
- Install [PM2](https://pm2.keymetrics.io/) on the server.
- Copy `.env.sample` to `.env` and configure it:
  - `DOMAIN` is the domain name that the users of the bot will see.
  - `HTTP_PORT` is the same port that you set in Nginx proxy_pass.
  - `SSH_USER` is a username that has permissions to modify the files related to the deployment.
  - `APP_DIR` is a folder for the node app.
  - `WWW_DIR` is a folder for the static files that Nginx serves publicly.
- Inspect `deploy.sh` and make the needed folders and configurations on the server, or changes to the deploy script.
- Create a Telegram bot with [BotFather](https://t.me/BotFather)
- Add the token to `TELEGRAM_SECRET` in `.env`
- Deploy the app with `./deploy.sh`. It will:
  - Send the app files to your server.
  - Build the node app on the server.
  - (Re)start the PM2 app.
  - Configure a webhook for Telegram.
- Follow the instructions in the Using with Paul the Office Dog section, except use your own Telegram bot.

## Supported event types
- Commits
- Force push
- New branch
- Delete branch
- New pull request
- Merge pull request
- Reject pull request
- Issues

## Why?

### Why an integration?
- Keep people up to date on what is happening
- Feeling of togetherness
- Feeling of momentum
- Process best practises should be fun
  - Increase commit message quality
  - More feature branches

### Why make your own?
- [@GitHubBot](https://t.me/GitHubBot) needs unreasonable permissions
- Ours is easier to set up in a new project – critical in small hobby projects
- Message format is more clear and more delightfu