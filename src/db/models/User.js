const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static associate(models) {
    User.hasMany(models.Event, {
      foreignKey: "userId",
      as: "events", // Alias for the association
      onDelete: "CASCADE",
    });

    //many-to-many
    User.belongsToMany(models.Event, {
      through: models.Subscription,
      as: "subscribedEvents",
      foreignKey: "userId",
      otherKey: "eventId",
    });
  }
}

module.exports = (sequelize) => {
  User.init(
    {
      telegram_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      timezone: {
        type: DataTypes.STRING,
        defaultValue: "UTC",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users", // Explicitly set table name
      timestamps: true,
    }
  );
  return User;
};
