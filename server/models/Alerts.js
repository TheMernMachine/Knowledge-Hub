const { Schema, model } = require('mongoose');

const alertSchema = new Schema({
    message: {
        type: String,
        required: true,
        alerts: [Alert],
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'info'],
    },
    
});

const Alert = model('alert',alertSchema)


//this resolver function gets all alert messages, returns them to client
const alertResolvers = {
    Query:{
        getAlerts: async () => {
            const alerts = await Alert.find();
            return alerts;
        },
    },
    //MUTATIONS??? CRUD
    Mutation:{
        addAlert: async (parent,{message,severity}) => {
            return Alert.create({message,severity});
        },
        removeAlert: async (parent, {_id}) => {
            return Alert.findOneAndDelete({ _id});
          }, 

          //this function uses await to ensure that the alert find method finishes. id value is specified in the args param
          updateAlert: async(parent,args) => {
            const alert = await Alert.findOneAndUpdate({_id: args._id},{...args},{new:true});
            return alert;
          }
    }
  };

module.exports = {Alert, alertResolvers};
