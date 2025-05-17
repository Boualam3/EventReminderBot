const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const { isValid, format } = require("date-fns");

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const allCommands = [
  {
    command: "/\start",
    description: "Start the bot",
  },
  {
    command: "/\createEvent",
    description: "Creation of the event",
  },
  {
    command: "/\help",
    description: "Showing all the commands",
  },
  {
    command: "/\see",
    description: "See all the events",
  },
];
const state = {
  initialState: "default",
  makeEvent: "createEvent",
};

let currentState = state.initialState;

// TODO: Write all the commands after the user type start.
bot.onText(/\/start/, (msg) => {
  const chat_id = msg.chat.id;
  bot.sendMessage(
    chat_id,
    `Hello, let's create a *new event*:
    /\createEvent: for create a new event
    /\help: for list all the comands
    /\see: for list all the events`,
    { parse_mode: "MarkdownV2" },
  );
});

bot.onText(/\/createEvent/, (msg) => {
  const chat_id = msg.chat.id;
  bot.sendMessage(
    chat_id,
    `Type the date in the following format: 
     *YYYY/MM/DD HH:MM*`,
    { parse_mode: "MarkdownV2" },
  );
  currentState = state.makeEvent;
});

bot.on("message", (msg) => {
  const chat_id = msg.chat.id;
  if (currentState === state.makeEvent) {
    const text = msg.text;
    if (isValid(new Date(text))) {
      const dateFormatted = format(text, "do 'of' MMMM yyyy 'at' HH':'mm");
      bot.sendMessage(
        chat_id,
        `This is the day:
        *${dateFormatted}*
        If you wanna to change it: /\change`,
        { parse_mode: "MarkdownV2" },
      );
    } else {
      bot.sendMessage(chat_id, "Please type a good date: Year/Month/Day");
    }
  }
});

bot.onText(/\/help/, (msg) => {
  const chat_id = msg.chat.id;
  bot.sendMessage(
    chat_id,
    `${allCommands
      .map((el) => {
        return el.command + ": " + el.description;
      })
      .join("\n")}`,
  );
});

bot.onText(/\/time/, (msg) => {
  const chat_id = msg.chat.id;
  const currentTime = new Date().toLocaleDateString();

  bot.sendMessage(chat_id, `Current Time : ${currentTime}`);
});

console.log("Bot is runnning ....");
