# 🤖 Telegram Event Reminder Bot

A Telegram bot built with [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) that helps you create, manage, and get reminders for events directly inside Telegram chats.

## 🚀 Project Overview

This bot is inspired by Discord’s event reminders but designed for Telegram. Currently, it replies to simple messages and can show the current date, but the plan is to evolve it into a fully-featured event reminder system, including:

- Creating events with date, time, and description
- Sending scheduled reminders for upcoming events
- Managing event lists in group chats and private messages
- Supporting recurring events and event notifications

## 🛠 Current Features

- Responds to any message with a friendly greeting.
- `/time` command to show the current date.

## 📦 Requirements

- Node.js >= 14
- Telegram bot token from [@BotFather](https://t.me/botfather)

## 💻 Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:Boualam3/EventReminderBot.git
cd EventReminderBot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Add your Telegram bot token:

```env
TELEGRAM_BOT_TOKEN=your-telegram-bot-token-here
```

### 4. Run the bot

```bash
node src/
```

You should see:

```
Bot is runnning ....
```

## 🔮 Planned Features

- `/nevent` command to add new events
- Event list management commands `/myevents`, `/events`
- Scheduled reminders sent before events start
- Recurring event support (daily, weekly, monthly)
- User-specific and group-specific event handling

📁 Project Structure
This project follows a modular and beginner-friendly layout for easy collaboration and growth.

```
src/
├── index.js               # Main entry point — initializes DB and bot
├── bot/
│   ├── bot.js             # Configures the Telegram bot (token, polling, commands setup)
│   └── commands/
│       └── start.js       # Example command handler for /start 
├── db/
│   ├── index.js           # Initializes Sequelize and connects to the database
│   └── models/
│       ├── User.js        # Defines User schema (Telegram user info)
│       └── Event.js       # Defines Event schema (event data, reminders, etc.)
├── utils/
│   └── time.js            # (Example) Utility functions like timezone conversion, date formatting
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for features or bug fixes.

## 🧼 License

MIT License

---

*This is a work in progress — stay tuned for more updates as the bot grows!*
```
