const {Schema, model} = require('mongoose');

const roleSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    permissions: [
        {
            type: String,
            required: true,
        },
    ],
});

const roleResolvers = {};

const Role = model('role', roleSchema);
module.exports = {roleSchema, roleResolvers};