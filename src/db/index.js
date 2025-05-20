const {Sequelize} = require("sequelize");


const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging:false
})


const User = require("./models/User")(sequelize)
const Event = require("./models/Event")(sequelize)
const Subscription = require("./models/Subscription")(sequelize)



// Define direct relationships for the join table (Subscription)
Subscription.associate({ User, Event })

// Call associate methods for User and Event 
User.associate({ Event, Subscription })
Event.associate({ User, Subscription })

async function initDB() {
    try {
      await sequelize.authenticate()
      await sequelize.sync({ force: true })
      console.log('db connection established...');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error; 
    }
  }


module.exports = {  
    initDB,
    User,
    Event,
    Subscription
}