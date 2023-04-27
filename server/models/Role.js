const { Schema, model } = require('mongoose');

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
    getRoles: async () => {
        let roles = await Role.find({});
        return roles;
    },
    role: async (_id) => {
        let role = await Role.findOne({ _id: _id });
        return role;
    },
    findRoleByName: async (name) => {
        let role = await Role.findOne({ name: name.toLowerCase() });
        return role;
    },
    createRole: async (name, permissions) => {
        let role = await Role.create({ name, permissions });
        return role;
    },
    updateRole: async ({ _id, name, permissions }) => {
        let role = await Role.findOneAndUpdate({ _id: _id }, { name, permissions }, { new: true });
        return role;
    },
    deleteRole: async (_id) => {
        let role = await Role.findOneAndDelete({ _id: _id });
        return role;
    },
};

module.exports = { Role, roleResolvers };