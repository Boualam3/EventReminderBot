const { moveState } = require("../../index.js");

const regexCommands = /\/[a-zA-Z]/gm;
module.exports = (bot) => {
  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const userText = msg.text;
    if (userText.match(regexCommands)) return;

    bot.sendMessage(chatId, gen.next().value);
  });
};
