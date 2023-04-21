const db = require ('../config/connection');
const { Alert } = require('../models');
const alertSeeds = require('./alertSeeds.json');

db.once('open', async () => {
    await Alert.deleteMany({});
    await Alert.create(alertSeeds);
  
    console.log('all done!');
    process.exit(0);
  });