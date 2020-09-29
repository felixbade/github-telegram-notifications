import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import { sendMessage } from './telegram'

dotenv.config()

const app = express()
const port = process.env.PORT
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    await sendMessage('test message')
    res.send('Hello World!')
})

app.post('/', async (req, res) => {
    const body = req.body

    console.log(JSON.stringify(body, null, 4))

    let messageToTelegram

    const commits = body.commits
    if (commits !== undefined) {
        const repositoryName = body.repository.name
        const branch = body.ref.replace('refs/heads/', '')

        let numberOfCommits
        if (commits.length === 1) {
            numberOfCommits = `1 new commit`
        } else {
            numberOfCommits = `${commits.length} new commits`
        }/* else {
            // if truncated
            numberOfCommits = `${commits.length}+ new commits`
        }*/

        const commitsText = commits.map((commit) => {
            const commitHash = commit.id.substring(0, 7);
            const message = commit.message
            const author = commit.author.name
            return `<a href="${commit.url}">${commitHash}</a>: ${message} by <b>${author}</b>`
        }).join('\n\n')
        
        messageToTelegram = `🎾 ${numberOfCommits} to <b>${repositoryName}</b> branch <b>${branch}</b>\n\n${commitsText}`
    }

    await sendMessage(messageToTelegram)
    res.send('OK!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})