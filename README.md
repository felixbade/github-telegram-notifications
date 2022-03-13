# GitHub Telegram Notifications
A simple Node.js Express server that receives GitHub notifications with a webhook and formats and sends them to Telegram.

## Using with Paul the Office Dog (easier)
- Add [Paul the Office Dog](https://t.me/PaulTheOfficeDogBot) to your Telegram group
- Add a webhook to your GitHub respository/organization according to Paul's instructions
  
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
- Message format is more clear and more delightful
