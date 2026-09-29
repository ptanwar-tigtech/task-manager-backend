export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Tasks", "metadata", {
            type: Sequelize.JSONB,
            allowNull: true
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn("Tasks", "metadata");
    }
};