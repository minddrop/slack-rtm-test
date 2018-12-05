const { RTMClient } = require('@slack/client')

const token = 'TOKENを入れてください'
const rtm = new RTMClient(token)
rtm.start()

const directBotId = 'チャンネルIDを入れてください'
const conversationId = 'チャンネルIDを入れて下しあ'

function postMessage(text, channelId) {
  rtm
    .sendMessage(text, channelId)
    .then(res => {
      // `res` contains information about the posted message
      console.log('Message sent: ', res.ts)
    })
    .catch(console.error)
}

postMessage("I'm born!", directBotId)

rtm.on('message', message => {
  postMessage(message.text, conversationId)
})
