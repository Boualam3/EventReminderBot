const allCommands = [
  { command: "/start", description: "Start the bot" },
  { command: "/settz", description: "Set or update your timezone" },
  { command: "/nevent", description: "Create a new event" },
  { command: "/events", description: "List all upcoming events" },
  {
    command: "/myevents",
    description: "List your upcoming events (in your timezone)",
  },
  { command: "/devent", description: "Delete an event by ID" },
  { command: "/help", description: "Show this help message" },
];

module.exports = (bot) => {
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      allCommands.map((el) => `${el.command}: ${el.description}`).join("\n")
    );
  });
};
