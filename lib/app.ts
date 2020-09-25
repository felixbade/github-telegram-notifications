import * as express from 'express'
import * as dotenv from 'dotenv'
import { default as axios, AxiosResponse } from 'axios'

dotenv.config()

const app = express()
const port = process.env.PORT

app.get('/', async (req, res) => {
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_SECRET}/sendMessage`, {
        // eslint-disable-next-line @typescript-eslint/camelcase
        chat_id: process.env.TELEGRAM_CHAT,
        text: 'test',
        disable_web_page_preview: true,
        parse_mode: 'HTML'
    }).catch((e) => console.log(e))
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})