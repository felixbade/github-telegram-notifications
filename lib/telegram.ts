import { default as axios } from 'axios'

export const sendMessage = async (chat_id: number, text: string) => {
    console.log('Sending to Telegram:', text)
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_SECRET}/sendMessage`, {
        // eslint-disable-next-line @typescript-eslint/camelcase
        chat_id,
        text,
        disable_web_page_preview: true,
        parse_mode: 'HTML'
    }).catch((e) => console.log(e))
}

export const htmlEscape = (text: string) => {
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
}