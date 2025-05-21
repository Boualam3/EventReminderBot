## 📋 TODO (In Progress)

### Database Setup (Sequelize + SQLite)
- [x] Install Sequelize and SQLite3
- [x] Create `User` model (`telegram_id`, `first_name`, `last_name`, `username`, `timezone`)
- [x] Create `Event` model (`title`, `start_time`, `end_time`, `is_recurring`, `userId`, `frequency enum(daily, weekly, monthly)`)
- [x] Define associations: User hasMany Events

### Bot Commands
- [ ] `/start` => register or update user in DB
- [ ] `/settz` => set or update user timezpne (update tmzone field)
- [ ] `/nevent` => collect title, date/time, recurrence, reminder mins
- [ ] `/events` => list upcoming events 
- [ ] `/myevents` => list user upcoming events (before list convert time to user timezone)
- [ ] `/devent` => delete event by ID
- [ ] `/help` => show command usage

### Reminder System
- [ ] Setup `node-schedule`
- [ ] Check for events starting soon and send reminders
- [ ] Mark events as `notified = true`
- [ ] Handle recurring events (daily, weekly, etc.)

### Testing
- [ ] Validate event creation flow
- [ ] Test reminder scheduling and delivery
- [ ] Catch edge cases (invalid date, duplicates, etc.)

### Optional Features (After MVP)
- [ ] Inline buttons for quick actions
- [ ] Natural language date parsing (`chrono-node`)
- [ ] Detect timezone from user location(for mobile only)
- [ ] Backup/export events


🌍 Timezone Example Flow
User runs /start , settz get called if timezone for user is empty
User runs /settz , it list timezones as keyboards buttons 

Bot saves timezone: "Europe/Berlin" in DB

On /nevent, bot saves event as UTC

On /myevents, bot converts event time from UTC → Berlin time