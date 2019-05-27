// Chat through terminal

module.exports = (bot) => {
  let term = process.openStdin()
  term.addListener("data", res => {
    let words = res.toString().trim().split(/ +/g)
    bot.channels.get("579501378251259915").send(words.join(" "))
  })
} 