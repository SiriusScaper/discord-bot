const { readdirSync } = require('fs')

module.exports = (bot) => {
  const read = dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(f => f.endsWith('.js'))
    for (let file of commands) {
      let cmdFile = require(`../commands/${dirs}/${file}`)
      bot.commands.set(cmdFile.config.name, cmdFile)
      if (cmdFile.config.aliases) cmdFile.config.aliases.forEach(a => bot.aliases.set(a, cmdFile.config.name))
    }
  }
  ['admin', 'misc', 'moderation'].forEach(d => read(d))
}