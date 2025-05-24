const eventBus = require("../eventBus");

const {
  handleUserCreate,
  handleUserUpdate,
  handleEventCreate,
  handleEventUpdate,
  handleEventDelete,
  handleEventReminderSet,
  handleEventReminderSent,
  handleEventRecurringSet,
  handleSubscriptionCreate,
  handleSubscriptionCancel,
  handleSchedulerCheck,
  handleSchedulerReminderTrigger,
} = require("../handlers");

module.exports = () => {
  // User-related events
  eventBus.on("user:create", handleUserCreate);
  eventBus.on("user:update", handleUserUpdate);

  // Event-related events
  eventBus.on("event:create", handleEventCreate);
  eventBus.on("event:update", handleEventUpdate);
  eventBus.on("event:delete", handleEventDelete);
  eventBus.on("event:reminder:set", handleEventReminderSet);
  eventBus.on("event:reminder:sent", handleEventReminderSent);
  eventBus.on("event:recurring:set", handleEventRecurringSet);

  // Subscription-related events
  eventBus.on("subscription:create", handleSubscriptionCreate);
  eventBus.on("subscription:cancel", handleSubscriptionCancel);

  // Scheduler events
  eventBus.on("scheduler:check", handleSchedulerCheck);
  eventBus.on("scheduler:reminder:trigger", handleSchedulerReminderTrigger);
};

// ===== Error Events =====
// eventBus.on('error', (err) => {
//   console.error('[error]', err)
// })

// eventBus.on('error:db', (err) => {
//   console.error('[error:db]', err)
// })

// eventBus.on('error:reminder', (err) => {
//   console.error('[error:reminder]', err)
// })
