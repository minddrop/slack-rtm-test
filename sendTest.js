// moduleを使ったサンプル

const postMessage = require('./app.js')
const channelId = process.env.BOT_CHANNEL_ID
postMessage('text', channelId)
