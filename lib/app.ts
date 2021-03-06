import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import { sendMessage } from './telegram'
import { formatCommits, formatPullRequest } from './format'

dotenv.config()

const app = express()
const port = process.env.PORT
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    res.send('See https://github.com/felixbade/github-telegram-notifications')
})

app.post('/:chat_id(-?\\d+)', async (req, res) => {
    const body = req.body
    const chat_id = parseInt(req.params.chat_id)

    console.log(JSON.stringify(body, null, 4))

    if (body.commits !== undefined) {
        const messageToTelegram = formatCommits(body)
        if (messageToTelegram !== undefined) {
            await sendMessage(chat_id, messageToTelegram)
        }
    }

    if (body.pull_request !== undefined) {
        const messageToTelegram = formatPullRequest(body)
        if (messageToTelegram !== undefined) {
            await sendMessage(chat_id, messageToTelegram)
        }
    }

    res.send('OK!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})