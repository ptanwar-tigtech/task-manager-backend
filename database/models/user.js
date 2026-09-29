import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Task, {
                foreignKey: "userId"
            });
        }
    }


    User.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "User",
            tableName: "Users",
            timestamps: true
        }
    );

    return User;
};