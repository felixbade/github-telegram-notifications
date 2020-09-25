import { default as axios, AxiosResponse } from 'axios'

export const sendMessage = async (text: string) => {
    console.log('Sending to Telegram:', text)
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_SECRET}/sendMessage`, {
        // eslint-disable-next-line @typescript-eslint/camelcase
        chat_id: process.env.TELEGRAM_CHAT,
        text,
        disable_web_page_preview: true,
        parse_mode: 'HTML'
    }).catch((e) => console.log(e))
}