export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("TaskActivities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primayKey: true,
        type: Sequelize.INTEGER
      },

      taskId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        refrences : {
          model: "Tasks",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },

      action: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt :{
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("TaskActivities");
  }
};
