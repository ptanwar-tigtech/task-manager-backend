export default {
    async up(queryInterface) {
        await queryInterface.addIndex(
            "Tasks",
            ["userId"],
            {
                name: "idx_tasks_user_id"
            }
        );
    },

    async down(queryInterface) {
        await queryInterface.removeIndex(
            "Tasks",
            "idx_tasks_user_id"
        );
    }
};