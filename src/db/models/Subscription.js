const { Model, DataTypes } = require('sequelize');

class Subscription extends Model {
    static associate(models) {
        Subscription.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        Subscription.belongsTo(models.Event, {
            foreignKey: 'eventId',
            as: 'event',
        });
    }
}


module.exports = (sequelize) => {
    Subscription.init(
        {
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            eventId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'events',
                    key: 'id',
                },
            },
            subscription_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            status: {
                type: DataTypes.ENUM('active', 'inactive'),
                allowNull: false,
                defaultValue: 'active',
            },
        },
        {
            sequelize,
            modelName: 'Subscription',
            tableName: 'subscriptions',
            timestamps: true,
            uniqueKeys: {
                uniqueSubscription: {
                    fields: ['userId', 'eventId'],
                },
            },
        }
    )
    return Subscription
}
