const { Schema, model } = require('mongoose');

const alertSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'info'],
    },

});

const Alert = model('alert', alertSchema)


//this resolver function gets all alert messages, returns them to client
const alertResolvers = {
    getAlerts: async () => {
        const alerts = await Alert.find();
        return alerts;
    },

    addAlert: async (message, severity) => {
        return await Alert.create({ message: message, severity: severity });
    },

    removeAlert: async (_id) => {
        return await Alert.findByIdAndDelete(_id);
    },

    updateAlert: async (args) => {
        const alerts = await Alert.findOneAndUpdate(args._id, args);
        return alerts
    },
}


module.exports = { Alert, alertResolvers };
