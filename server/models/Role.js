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

const Role = model('role', roleSchema);


const roleResolvers = {
    
};

module.exports = {roleSchema, roleResolvers};