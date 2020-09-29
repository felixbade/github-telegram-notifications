import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import { sendMessage } from './telegram'

dotenv.config()

const app = express()
const port = process.env.PORT
app.use(bodyParser)

app.get('/', async (req, res) => {
    await sendMessage('test message')
    res.send('Hello World!')
})

app.post('/', async (req, res) => {
    await sendMessage('received post request')
    console.log(req.body)
    res.send('OK!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})