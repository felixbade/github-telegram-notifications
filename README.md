# GitHub Telegram Notifications
A simple Node.js Express server that receives GitHub notifications with a webhook and formats and sends them to Telegram.

## Using with Paul the Office Dog (easier)
- Add [Paul the Office Dog](https://t.me/PaulTheOfficeDogBot) to your Telegram group
- Get the group chat id. You can use for example [Chat ID Echo bot](https://t.me/chatid_echo_bot).
- Add a new Webhook to your GitHub repository/organisation:
  - Payload URL: `https://github-notifications.felixbade.fi/<chat_id>`
  - Content type: `application/json`
  
## Running your own instance (more private)
- Create a bot with [BotFather](https://t.me/BotFather)
- Copy `.env.sample` to `.env` and put your access token there
- Run the code on some server of yours
- Follow the instructions in the Using with Paul the Office Dog section, except use your own Telegram bot.

## Supported event types
- Commits
- Force push
- New branch
- Delete branch
- New pull request
- Merge pull request
- Reject pull request

## Planned features
- Say the group chat id to Telegram after the bot has been added to a new group
  - Also GitHub webhook setup instructions
- Send some success message to Telegram when the integration is set up and GitHub sends a ping
- More event types, like issues

## Why?
I like making software projects with my friends. Repository notifications benefit the team spirit and help stay up to date when someone works on a feature on their own. I didn't like the required permissions and message format in [@GitHubBot](https://t.me/GitHubBot) so we made our own. This is also quicker to set up for new repositories – which is essential for small projects.
