const User = require('../../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({
        email: args.userInput.email,
      });
      if (existingUser) {
        throw new Error('User Exists already');
      }

      const password = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password,
      });
      await user.save();
      console.log(user);
      return { ...user._doc, password: null, _id: user.id };
    } catch (error) {
      throw error;
    }
  },
};
