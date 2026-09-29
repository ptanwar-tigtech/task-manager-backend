import { Model, DataTypes } from "sequelize";

export default (sequelize)=>{
    class TaskActivity extends Model{
        static associate(models){
            TaskActivity.belongsTo(models.Task, {
                foreignKey: "taskId"
            })
        }
    }

    TaskActivity.init({
        taskId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        action: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "TaskActivity",
        tableName: "TaskActivities",
        timestamps: true
    }
)

    return TaskActivity
}