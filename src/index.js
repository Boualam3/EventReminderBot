const TelegramBot = require('node-telegram-bot-api')
const dotenv = require("dotenv");
dotenv.config();


const token = process.env.TELEGRAM_BOT_TOKEN;



const bot = new TelegramBot(token, {polling:true})

bot.on('message', (msg)=>{
    const chat_id = msg.chat.id
    bot.sendMessage(chat_id, "Yoo  Im your freindly telegram bot. how i can help you!")
})

bot.onText(/\/time/, (msg)=> {
    const chat_id = msg.chat.id
    const currentTime = new Date().toLocaleDateString()

    bot.sendMessage(chat_id, `Current Time : ${currentTime}`)
})

console.log("Bot is runnning ....");