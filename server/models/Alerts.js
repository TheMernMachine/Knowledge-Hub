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

const alertResolvers = {};

module.exports = {alertSchema, alertResolvers};
