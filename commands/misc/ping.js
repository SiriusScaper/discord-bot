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
    // Send a message telling the user the command is being run and then return the response
    message.channel.send('Getting the ping...').then(r => {
      let ping = r.createdTimestamp - message.createdTimestamp
      // Array of possible responses
      let responses = ['Is this really my ping?  ', `I can't look...  `, `It's crappy I can tell by the way you're not responding  `]
      // Randomized response
      let response = responses[Math.floor(Math.random() * responses.length)]

      // Return the latency of the bot and the api latency
      r.edit(`${response} Bot Latency: \`${ping}\`, API Latency: \`${Math.round(bot.ping)}\``)
    })
  }
}