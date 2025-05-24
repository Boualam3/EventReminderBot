const eventBus = require("../../events/eventBus");

const startCommand = (bot) => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    eventBus.emit("user:create", { telgUser: msg.from });
    bot.sendMessage(chatId, "Welcome " + msg.from.first_name);
  });
};

module.exports = startCommand;
