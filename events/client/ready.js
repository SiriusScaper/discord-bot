/* eslint-disable no-console */

module.exports = bot => {
  // Confirmation that the bot is running
  console.log(`Logged in as ${bot.user.tag}!`)

  let status = [
    `${bot.guilds.size}!`,
    '!help',
    `${bot.users.size} users!`
  ]

  setInterval(() => {
    let s = status[Math.floor(Math.random() * status.length)]
    bot.user.setActivity(s, { type: 'WATCHING' })
  }, 5000)
}