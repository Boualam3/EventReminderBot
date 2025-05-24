# 🤖 Telegram Event Reminder Bot

A Telegram bot built with [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) that helps you create, manage, and get reminders for events directly inside Telegram chats.

## 🚀 Project Overview

    Inspired by Discord’s event features, this bot brings event reminders to Telegram with a focus on usability and timezone accuracy.
    It supports:
    - Creating one-time or recurring events
    - Setting timezone per user
    - Sending reminders before events
    - Managing personal and group event lists

This bot is still a **work in progress**, and contributions are welcome!

## 🛠 Current Features

- Responds to any message with a friendly greeting.
- `/time` command to show the current date.

## 📦 Requirements

- Node.js >= 14
- Telegram bot token from [@BotFather](https://t.me/botfather)

## 📁 Project Structure

This project follows a modular and beginner-friendly layout for easy collaboration and growth.

src/
├── index.js # Main entry — initializes DB and bot
├── bot/
│ ├── bot.js # Bot setup (token, polling, command handlers)
│ ├── commands/ # Command handlers: /start, /nevent, /myevents, etc.
│ │ ├── devent.js
│ │ ├── events.js
│ │ ├── help.js
│ │ ├── myevents.js
│ │ ├── nevent.js
│ │ ├── settz.js
│ │ └── start.js
│ └── callbacks/
│ ├── index.js
│ └── settz.js
├── db/
│ ├── index.js # Sequelize init and DB connection
│ ├── testdb.js # Sample DB test script
│ └── models/ # Sequelize models
│ ├── Event.js
│ ├── Subscription.js
│ └── User.js
├── events/
│ ├── eventBus.js
│ ├── handlers/
│ │ ├── event.js
│ │ ├── index.js
│ │ ├── scheduler.js
│ │ ├── subscription.js
│ │ └── user.js
│ └── listeners/
│ └── index.js
└── utils/

## 💻 Getting Started

### 1. Clone the repository

git clone git@github.com:Boualam3/EventReminderBot.git
cd EventReminderBot

### 2. Install dependencies

npm install

### 3. Create `.env` file

Add your Telegram bot token:

TELEGRAM_BOT_TOKEN=your-telegram-bot-token-here

### 4. Run the bot

node src/

You should see:

Bot is runnning ....

## ⏰ Reminder System

- Uses `node-schedule` to check upcoming events
- Sends reminders before the event starts
- Supports one-time and recurring events
- Respects user timezones

## 🌍 Timezone Handling

- User sets timezone via `/settz` (keyboard selection)
- Events are stored in UTC
- Displayed event times are converted to each user’s timezone

## 📡 Internal Event System

The project uses a custom event emitter (via `events/eventBus.js`) to decouple internal logic.  
For example:

- When a user subscribes to an event, a `userSubscribed` event is emitted.
- Listeners in `events/listeners/` can react independently to these actions (e.g., send a notification, log activity, etc.).

This modular design improves scalability and code readability.

## 📋 Roadmap & TODO

For a detailed list of tasks and progress, check `TODO.md`.

## 🤝 Contributing

We welcome contributors! If you're joining the project:

1. Clone the repo and follow the setup above
2. Create a new feature branch from `dev`:  
   git checkout dev  
   git checkout -b feature/your-feature-name
3. Work on your changes and commit them to the feature branch
4. Push the branch and open a Pull Request **into `dev`**:  
   git push origin feature/your-feature-name
5. After review and merge into `dev`, the `main` branch will only receive

Please do **not** open PRs directly to `main`. All work should follow the flow:  
`feature/*` → `dev` → `main`

## 🧼 License

MIT License

---

_This bot is in active development — feel free to fork, test, and improve it!_
