const { Schema, model } = require('mongoose');


const alertSchema = new Schema({
message:{
    type: String,
    required:true,
},
severity: {
    type: String,
    enum: ['low','medium','high','info'],
},


});

const Alert = model('alert', alertSchema);
module.exports = Alert;
