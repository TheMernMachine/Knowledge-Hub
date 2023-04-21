const db = require('../config/connection');
const { Role, User } = require('../models');
const userSeeds = require('./userSeeds.json');
const roleSeeds = require('./roleSeeds.json');

db.once('open', async () => {
  try {
    await Role.deleteMany({});
    await User.deleteMany({});

    await Role.create(roleSeeds);

    for (let i = 0; i < userSeeds.length; i++) {
      let role;
      if (i % 2 === 0) {
        role = await Role.findOne({ name: 'Teacher' });
      } else {
        role = await Role.findOne({ name: 'Student' });
      }

      await User.create({
        firstName: userSeeds[i].firstName,
        lastName: userSeeds[i].lastName,
        email: userSeeds[i].email,
        password: userSeeds[i].password,
        role: role._id
      });
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
