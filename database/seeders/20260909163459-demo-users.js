export default {
    async up(queryInterface) {
        await queryInterface.bulkInsert("Users", [
            {
                name: "Pummy",
                email: "pummy+12@gmail.com",
                password: "123456",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Rahul",
                email: "rahul@gmail.com",
                password: "123456",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Amit",
                email: "amit@gmail.com",
                password: "123456",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete("Users", null, {});
    }
};