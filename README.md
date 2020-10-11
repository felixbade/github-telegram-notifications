# GitHub Telegram Notifications
A simple Node.js Express server that receives GitHub notifications with a webhook and formats and sends them to Telegram.

## Using
- Add [Paul the Office Dog](https://t.me/PaulTheOfficeDogBot) to your Telegram group
- Get the group chat id. You can use for example [Chat ID Echo bot](https://t.me/chatid_echo_bot).
- Add a new Webhook to your GitHub repository/organisation:
  - Payload URL: `https://github-notifications.felixbade.fi/<chat_id>`
  - Content type: `application/json`

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
  - Also webhook setup instructions
- Send some success message to Telegram when the integration is set up and GitHub sends a ping
- More event types, like issues
