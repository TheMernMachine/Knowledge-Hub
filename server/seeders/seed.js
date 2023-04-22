const db = require('../config/connection');
const { Role, User, Forum, userResolvers } = require('../models');
const userSeeds = require('./userSeeds.json');
const roleSeeds = require('./roleSeeds.json');
const forumSeeds = require('./forumSeeds.json');

db.once('open', async () => {
  try {
    await Role.deleteMany({});
    await User.deleteMany({});
    await Forum.deleteMany({});

    await Role.create(roleSeeds);

    for (let i = 0; i < userSeeds.length; i++) {
      let role;
      if (i === 0) {
        role = await Role.findOne({ name: 'admin' });
      } else if (i < 3) {
        role = await Role.findOne({ name: 'teacher' });
      } else {
        role = await Role.findOne({ name: 'student' });
      }

      await User.create({
        firstName: userSeeds[i].firstName,
        lastName: userSeeds[i].lastName,
        email: userSeeds[i].email,
        password: userSeeds[i].password,
        role: role._id
      });
    }

    for (let i = 0; i < forumSeeds.length; i++) {
      let user = await User.findOne({ email: forumSeeds[i].email });
      await Forum.create({
        title: forumSeeds[i].title,
        postQuestion: forumSeeds[i].postQuestion,
        postAuthor: user._id,
      });
    }

    const allUsers = await User.find({});
    // console.log(allUsers);
    const admin = await User.findOne({
      email: "bkernighan@techfriends.dev"
    });

    // activate all users
    for (let i = 0; i < allUsers.length; i++) {
      let user = allUsers[i];
      const updatedUser = await userResolvers.setUserStatus(admin._id, user._id, "active");
    }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
