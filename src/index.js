const { initDB } = require('./db');
const bot = require("./bot/bot");

initDB().then(()=>{

    // Register commands
    require("./bot/commands/help")(bot)
    // require("./commands/start")(bot);
    // require("./commands/settz")(bot);
    // require("./commands/nevent")(bot);
    // require("./commands/events")(bot);
    // require("./commands/myevents")(bot);
    // require("./commands/devent")(bot);
}).catch()
