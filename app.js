const { RTMClient } = require('@slack/client')

const token = process.env['BOT_USER_OAUTH_ACCESS_TOKEN']
const rtm = new RTMClient(token)
rtm.start()
rtm.on('ready', () => {
  console.log('部室ちゃん、準備完了いたしました！')
})

const directBotId = process.env['BOT_CHANNEL_ID']
const conversationId = process.env['BUSHITUSCHAN_CHANNEL_ID']

module.exports = function postMessage(text, channelId) {
  rtm
    .sendMessage(text, channelId)
    .then(res => {
      console.log('Message sent: ', res.ts)
    })
    .catch(console.error)
}

// postMessage("I'm born!", directBotId)

rtm.on('message', message => {
  if (!message.bot_id) {
    console.log(`${message.user}が${message.text}っていったよ`)
  }
})
