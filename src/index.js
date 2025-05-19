const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const { isValid, format, parse } = require("date-fns");

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

const initialState = {
  step: "default",
  data: {},
};

const userState = new Map();

function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return { ...state, step: "waiting_title", data: {} };
    }
    case "SET_TITLE":
      return {
        ...state,
        step: "waiting_description",
        data: { ...state.data, title: action.payload },
      };

    case "SET_DESCRIPTION":
      return {
        ...state,
        step: "waiting_date",
        data: { ...state.data, description: action.payload },
      };

    case "SET_DATE":
      return {
        ...state,
        step: "results",
        data: { ...state.data, date: action.payload },
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

function dispatch(state, action) {
  const prevState = userState.get(state) ?? initialState;
  const nextState = reducer(prevState, action);
  userState.set(state, nextState);
}

bot.onText(/\/start/, (msg) => {
  const chat_id = msg.chat.id;
  bot.sendMessage(chat_id, `Hello, let's create a *new event*:`, {
    reply_markup: {
      keyboard: [["/createEvent"], ["/help", "/see"]],
    },
    parse_mode: "MarkdownV2",
  });
  userState.set(chat_id, initialState);
});

bot.onText(/\/reset/, (msg) => {
  const chat_id = msg.chat.id;

  bot.sendMessage(
    chat_id,
    `Bot resetted, type /help for see all the commands`,
    {
      parse_mode: "MarkdownV2",
    },
  );

  dispatch(chat_id, { type: "RESET" });
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

bot.onText(/\/createEvent/, (msg) => {
  const chat_id = msg.chat.id;
  dispatch(chat_id, { type: "INIT" });
  return bot.sendMessage(chat_id, "Set your title");
});

bot.onText(/\/back/, (msg) => {
  const chat_id = msg.chat.id;
  dispatch(chat_id, { type: "PREV_STEP" });
  return bot.sendMessage(chat_id, "Set your title");
});

bot.on("message", (msg) => {
  const chat_id = msg.chat.id;
  const userText = msg.text;
  const regexEvents = /\/[a-zA-Z]/gm;
  if (!userState.get(chat_id) || userText.match(regexEvents)) return;
  const currentState = userState.get(chat_id);
  const currentStep = currentState?.step;

  if (currentStep === "waiting_title") {
    dispatch(chat_id, { type: "SET_TITLE", payload: userText });
    return bot.sendMessage(chat_id, "Set the *description*", {
      parse_mode: "MarkdownV2",
    });
  }

  if (currentStep === "waiting_description") {
    dispatch(chat_id, {
      type: "SET_DESCRIPTION",
      payload: userText,
    });
    return bot.sendMessage(
      chat_id,
      "Sey the *date* with *hour* \n Recommended *format* YYYY/MM/DD HH:MM ",
      {
        parse_mode: "MarkdownV2",
      },
    );
  }

  if (currentStep === "waiting_date") {
    let parsedDate = parse(userText, "yyyy/MM/dd HH:mm", new Date());
    if (isValid(parsedDate)) {
      dispatch(chat_id, { type: "SET_DATE", payload: parsedDate });
      // Get updated state
      const { title, description, date } = userState.get(chat_id).data;
      const dateFormatted = format(date, "do 'of' MMMM yyyy 'at' HH':'mm");
      return bot.sendMessage(
        chat_id,
        `*${title}*
${description}
${dateFormatted}`,
        {
          parse_mode: "MarkdownV2",
        },
      );
    } else {
      return bot.sendMessage(
        chat_id,
        "Try again with the reccomended *format*: \nYYYY/MM/DD HH:MM",
      );
    }
  }

  if (currentStep === "results") {
    console.log(userState);
  }
});

console.log("Bot is runnning ....");
