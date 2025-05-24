function handleEventCreate(event) {
  // TODO: Set up initial data for create new event (title, start_time, etc)
  // possible we can used as entry point or signal of reminders (cron)
}

function handleEventUpdate(event) {
  // TODO: Reflect any changes in title, start_time etc..
  //notify subscribers if the event details (start_time) have changed
}

function handleEventDelete(eventId) {
  // TODO: remove event ofc when today > end_time
  // Clean up  scheduled reminders associated with this event
}

function handleEventReminderSet(eventId) {
  // TODO: Schedule a reminder notification to be triggered before event start
  // Store time and target user for future reference
}

function handleEventReminderSent(eventId) {
  // TODO: Log that a reminder has been sent and update event (notified)
}

function handleEventRecurringSet(eventId) {
  // TODO: Generate and queue the next occurrence of a recurring event
}

module.exports = {
  handleEventCreate,
  handleEventUpdate,
  handleEventDelete,
  handleEventReminderSet,
  handleEventReminderSent,
  handleEventRecurringSet,
};
