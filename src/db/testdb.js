const { initDB, User, Event, Subscription } = require("../db");

async function demo() {
  await initDB();

  // === USERS ===
  const user1 = await User.create({
    telegram_id: "11111",
    first_name: "Alice",
    last_name: "Smith",
    username: "alice_smith",
    timezone: "UTC",
  });

  const user2 = await User.create({
    telegram_id: "11112",
    first_name: "Bob",
    last_name: "Johnson",
    username: "bob_johnson",
    timezone: "UTC",
  });

  const user3 = await User.create({
    telegram_id: "11113",
    first_name: "Charlie",
    last_name: "Lee",
    username: "charlie_lee",
    timezone: "UTC",
  });

  // === EVENTS ===
  const event1 = await Event.create({
    title: "Marketing Sync",
    start_time: new Date("2025-05-21T10:00:00Z"),
    end_time: new Date("2025-05-21T11:00:00Z"),
    is_recurring: false,
    frequency: null,
    userId: user1.id,
  });

  const event2 = await Event.create({
    title: "Dev Standup",
    start_time: new Date("2025-05-21T12:00:00Z"),
    end_time: new Date("2025-05-21T12:30:00Z"),
    is_recurring: true,
    frequency: "daily",
    userId: user2.id,
  });

  const event3 = await Event.create({
    title: "Design Review",
    start_time: new Date("2025-05-22T09:00:00Z"),
    end_time: new Date("2025-05-22T10:00:00Z"),
    is_recurring: true,
    frequency: "weekly",
    userId: user3.id,
  });

  // === SUBSCRIPTIONS ===
  await Subscription.create({
    userId: user1.id,
    eventId: event1.id,
    status: "active",
  });

  await Subscription.create({
    userId: user1.id,
    eventId: event2.id,
    status: "active",
  });

  await Subscription.create({
    userId: user2.id,
    eventId: event2.id,
    status: "active",
  });

  await Subscription.create({
    userId: user2.id,
    eventId: event3.id,
    status: "inactive",
  });

  await Subscription.create({
    userId: user3.id,
    eventId: event1.id,
    status: "active",
  });

  await Subscription.create({
    userId: user3.id,
    eventId: event3.id,
    status: "active",
  });

  // === OUTPUT ===
  console.log("\n📌 Users:");
  const users = await User.findAll();
  users.forEach((user) => {
    console.log(`- ${user.username} (${user.first_name} ${user.last_name})`);
  });

  console.log("\n📌 Events:");
  const events = await Event.findAll();
  events.forEach((event) => {
    console.log(`- ${event.title} (Owner ID: ${event.userId})`);
  });

  console.log("\n📌 Subscriptions:");
  const subs = await Subscription.findAll({
    include: [
      { model: User, as: "user" },
      { model: Event, as: "event" },
    ],
  });
  subs.forEach((sub) => {
    console.log(`- ${sub.user.username} → ${sub.event.title} [${sub.status}]`);
  });

  process.exit(0);
}

demo().catch(console.error);
