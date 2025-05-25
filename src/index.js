const { initDB } = require("./db/index.js");
const bot = require("./bot/bot");

initDB()
  .then(() => {
    // Register commands
    require("./bot/commands/help")(bot);
    require("./bot/commands/start")(bot);
    require("./bot/commands/text")(bot);
    // require("./bot/commands/settz")(bot);
    // require("./bot/commands/nevent")(bot);
    // require("./bot/commands/events")(bot);
    // require("./bot/commands/myevents")(bot);
    // require("./bot/commands/devent")(bot);
  })
  .catch();

const initialState = {
  state: "default",
  step: [],
  data: {},
};

// const userState = new Map(1, initialState);

const states = [
  {
    state: "Start",
    step: [
      {
        type: "Set_Username",
        message: "Set your username please",
      },
      {
        type: "Set_FirstName",
        message: "Set your first name please: (Optional,text null)",
      },
      {
        type: "Set_Lastname",
        message: "Set your last name please (Optional,text null)",
      },
      {
        type: "Set Timezone",
        message: "Set your timezone",
      },
    ],
  },
  {
    state: "Event",
    step: [
      {
        type: "Set_Title",
        message: "Set your username please",
      },
      {
        type: "Set_Description",
        message: "Set your first name please: (Optional,text null)",
      },
      {
        type: "Set_Date",
        message: "Set your last name please (Optional,text null)",
      },
    ],
  },
];

function* moveState(currState) {
  let j = 0;
  let index;

  for (let i = 0; i < states.length; i++) {
    if (states[i].state === currState) {
      console.log(i);
      return (index = i);
    }
  }

  if (index === undefined)
    return { error: "Something went wrong, please try again!" };

  while (true) {
    yield states[index].step[j].message; // Return the step
    j++; // Take the next step
    // If there are no step, take the next State
    if (j == states[index].step.length) {
      j = 0; // Reset the step for the new State
    }
  }
}

module.exports = {
  moveState,
};
