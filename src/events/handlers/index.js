module.exports = {
    ...require("./eventHandlers/user"),
    ...require("./eventHandlers/event"),
    ...require("./eventHandlers/subscription"),
    ...require("./eventHandlers/scheduler"),
}