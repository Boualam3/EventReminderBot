const { Model, DataTypes } = require("sequelize");

class Event extends Model {
  static associate(models) {
    Event.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user", // Alias for association
    });

    // many-to-many
    Event.belongsToMany(models.User, {
      through: models.Subscription,
      as: "subscribers",
      foreignKey: "eventId",
      otherKey: "userId",
    });
  }
}

module.exports = (sequelize) => {
  Event.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [10, 255],
        },
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: true,
        },
      },
      is_recurring: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      frequency: {
        type: DataTypes.ENUM("daily", "weekly", "monthly"),
        allowNull: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users", // coz we rename user table so correctly reference the users table
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "events", // Explicitly set table name
      timestamps: true,
    }
  );

  return Event;
};
