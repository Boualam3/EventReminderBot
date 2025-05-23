function handleSubscriptionCreate(data) {
    // TODO: Add a user to an event or reminder group subscription list.
    //       Could be triggered by a user opting in or joining a group.
}
  
function handleSubscriptionCancel(subscriptionId) {
    // TODO: Remove a user from a subscription.
    //       Ensure no further reminders are sent to them for that event.
}
  
module.exports = {
    handleSubscriptionCreate,
    handleSubscriptionCancel,
}
  