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
    console.log(req.body)
    await sendMessage(JSON.stringify(req.body))
    res.send('OK!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})