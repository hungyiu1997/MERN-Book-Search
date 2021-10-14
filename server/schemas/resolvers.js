const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async function (parent, args, context) {
      console.log('Hello');
      if (context.user._id) {
        const userData = await User.findOne({
          _id: context.user._id,
          // .select can filter what you dont want to return
          // -password: dont need password //mongoDB internal version key
        }).select("-__v -password");
        // console.log(userData);
        return userData;
      }

      throw new AuthenticationError("User Not Valid!");
    },
  },
  Mutation: {
    //arg is the req.body
    async createUser(parent, args, context) {
      const user = await User.create(args);

      const token = signToken(user);
      return { token, user };
    },
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    // {body} is destructured req.body
    login: async function (parent, { email, password }) {
      const user = await User.findOne({ email });
      //   $or: [{ username: args.username }, { email: args.email }],
      // });
      if (!user) {
        throw new AuthenticationError("Login incorrect!");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Password incorect!");
      }
      const token = signToken(user);
      return { token, user };
    },
    // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    // user comes from `req.user` created in the auth middleware function
    saveBook: async function (parent, args, context) {
      console.log(args);
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.bookData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new AuthenticationError(err);
      }
    },
    // remove a book from `savedBooks`
    async deleteBook(parent, args, context) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new AuthenticationError("Cannot find user with this ID!");
      }
      return updatedUser;
    },
  },
};

module.exports = resolvers;
