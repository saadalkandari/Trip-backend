const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await Users.findOne({ username: username });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) done(null, user);
      else done(null, false);
      const error = {
        message: "Unauthorized",
        status: 401,
      };
    }
    done(error);
  } catch (error) {
    done(error);
  }
});
