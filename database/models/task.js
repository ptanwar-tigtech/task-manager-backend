import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: "userId"
      })
    }
  }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false
    },

    priority: {
      type: DataTypes.STRING,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    metadata : {
      type: DataTypes.JSONB,
      allowNull: true
    }
  },
    {
      sequelize,
      modelName: "Task",
      tableName: "Tasks",
      timestamps: true
    });
  return Task;
};