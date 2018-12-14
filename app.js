const { RTMClient, WebClient } = require('@slack/client')
const APIEndpoint = 'https://slack.com/api'
const fetch = require('node-fetch')
const token = process.env['BOT_USER_OAUTH_ACCESS_TOKEN']
const apiToken = process.env['API_TOKEN']

async function apiTest() {
  return fetch(`${APIEndpoint}/api.test`, { method: 'POST' })
}
;(async () => {
  const testStatus = await (await apiTest()).json()
  console.log('APIサーバーは:', testStatus)
})()

const api = new WebClient(apiToken)
const rtm = new RTMClient(token)
rtm.start()
rtm.on('ready', () => {
  console.log('部室ちゃん、準備完了いたしました！')
})

// モジュール化すると他のjsファイルから呼び出すことができ、ここでもモジュール化前と同じように使うこともできる
module.exports = function postMessage(text, channelId) {
  rtm
    .sendMessage(text, channelId)
    .then(res => {
      console.log('Message sent: ', res.ts)
    })
    .catch(console.error)
}

rtm.on('message', async message => {
  if (!message.bot_id && message.user) {
    const userName = api.users
      .info({ user: message.user })
      .then(res => {
        console.log(`${res.user.name}が${message.text}っていったよ`)
      })
      .catch(console.error)
  } else if (message.bot_id) {
    console.log(message.user)
  }
})

rtm.on('reaction_added', e => {
  console.log(e.item.channel, e.item.ts)
  api.chat
    .delete({ channel: e.item.channel, ts: e.item.ts })
    .catch(console.error)
})
