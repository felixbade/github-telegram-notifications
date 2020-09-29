import * as express from 'express'
import * as dotenv from 'dotenv'
import { default as axios, AxiosResponse } from 'axios'
import { sendMessage } from './telegram'

dotenv.config()

const app = express()
const port = process.env.PORT

app.get('/', async (req, res) => {
    await sendMessage('test message')
    res.send('Hello World!')
})

app.post('/', async (req, res) => {
    await sendMessage('received post request')
    res.send('OK!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})