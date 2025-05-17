const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const { isValid, format } = require("date-fns");

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const state = {
  initialState: "default",
  makeEvent: "createEvent",
};
let currentState = state.initialState;

bot.onText(/\/start/, (msg) => {
  const chat_id = msg.chat.id;
  bot.sendMessage(
    chat_id,
    "Hello, let's create a new events: <list all commands>", // TODO: Write all the commands after the user type start.
  );
});

bot.onText(/\/createEvent/, (msg) => {
  const chat_id = msg.chat.id;
  bot.sendMessage(
    chat_id,
    "Let's create a new event: \n Type the date in the following format Year/Month/Day/Hours/Minutes",
  );
  currentState = state.makeEvent;
});

bot.on("message", (msg) => {
  const chat_id = msg.chat.id;
  if (currentState === "createEvent") {
    const text = msg.text;
    if (isValid(new Date(text))) {
      const dateFormatted = format(text, "do 'of' MMMM yyyy 'at' HH':'mm");
      bot.sendMessage(chat_id, `This is the day:\n${dateFormatted}`);
      currentState = state.makeHours;
    } else {
      bot.sendMessage(chat_id, "Please type a good date: Year/Month/Day");
    }
  }
});

bot.onText(/\/time/, (msg) => {
  const chat_id = msg.chat.id;
  const currentTime = new Date().toLocaleDateString();

  bot.sendMessage(chat_id, `Current Time : ${currentTime}`);
});

console.log("Bot is runnning ....");
