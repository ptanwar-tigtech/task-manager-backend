export const createTaskSchema = {
    type: "object",

    properties: {
        title: {
            type: "string",
            minLength: 1
        },

        description: {
            type: "string",
            minLength: 1
        },

        status: {
            type: "string",
            enum: ["pending", "completed"]
        },

        priority: {
            type: "string",
            enum: ["low", "medium", "high"]
        },

        metadata: {
            type: "object"
        }
    },

    required: [
        "title",
        "description",
        "status",
        "priority"
    ],

    additionalProperties: false
};