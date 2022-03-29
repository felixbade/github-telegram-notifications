import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import { sendMessage } from './telegram'
import { formatEvent, formatCommits, formatPullRequest } from './format'

dotenv.config()

const app = express()
const port = process.env.HTTP_PORT
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    res.send('See https://github.com/felixbade/github-telegram-notifications')
})

app.post('/:chat_id(-?\\d+)', async (req, res) => {
    const body = req.body
    const event = req.headers['x-github-event']
    const chat_id = parseInt(req.params.chat_id)

    console.log('GitHub')
    console.log(`Event: ${event}`)
    console.log(JSON.stringify(body, null, 4))

    const messageToTelegram = formatEvent(body, event)
    if (messageToTelegram !== undefined) {
        await sendMessage(chat_id, messageToTelegram)
    }

    res.send('OK!')
})

app.post(`/telegram-hook/${process.env.TELEGRAM_SECRET}`, async (req, res) => {
    const body = req.body
    const domain = req.headers.host

    console.log('Telegram')
    console.log(JSON.stringify(body, null, 4))

    if (body.my_chat_member !== undefined) {
        const { old_chat_member, new_chat_member, chat } = body.my_chat_member
        if ((old_chat_member.status === 'left' || old_chat_member.status === 'kicked')
                && (new_chat_member.status === 'member' || new_chat_member.status === 'administrator')) {
            // Added to a new chat
            const messageLines = [
                '🐶 Hello there! I’m Paul, and I watch GitHub repositories!',
                '',
                'To get started, go to your repository or organization settings, and add a new webhook.',
                '',
                `• Payload URL: <code>https://${domain}/${chat.id}</code>`,
                '• Content type: application/json',
                '• Select the events you want. I recommend everything.',
                '',
                'I’ll confirm when it works!'
            ]
            const messageToTelegram = messageLines.join('\n')

            await sendMessage(chat.id, messageToTelegram)
        }
    }

    res.send('OK!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})