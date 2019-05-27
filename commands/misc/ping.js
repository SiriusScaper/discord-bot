module.exports = {
  config: {
    name: 'ping',
    description: 'Ping!',
    usage: '!ping',
    authorized: 'Members',
    category: 'misc',
    aliases: ['status'],
  },
  run: async (bot, message, args) => {
    message.channel.send('Getting the ping...').then(r => {
      let ping = r.createdTimestamp - message.createdTimestamp
      let responses = ['Is this really my ping?  ', `I can't look...  `, `It's crappy I can tell by the way you're not responding  `]
      let response = responses[Math.floor(Math.random() * responses.length)]

      r.edit(`${response} Bot Latency: \`${ping}\`, API Latency: \`${Math.round(bot.ping)}\``)
    })
  }
}