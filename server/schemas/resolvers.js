const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            return User.findOne({_id: context.user._id});
        },
    },
    Mutation: {
        //arg is the req.body
        async createUser(parent, args, context) {
            const user = await User.create(args);
        
            if (!user) {
              throw new AuthenticationError('User not valid!')
            }
            const token = signToken(user);
            return { token, user };
          },
          // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
          // {body} is destructured req.body
          async login(parent, args, context) {
            const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
            if (!user) {
              throw new AuthenticationError('Login incorrect!')
            }
        
            const correctPw = await user.isCorrectPassword(args.password);
        
            if (!correctPw) {
              throw new AuthenticationError('Password incorect!')
            }
            const token = signToken(user);
            return { token, user };
          },
          // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
          // user comes from `req.user` created in the auth middleware function
          async saveBook(parent, args, context) {
            console.log(args);
            try {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args } },
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
              throw new AuthenticationError('Cannot find user with this ID!');
            }
            return updatedUser;
          },
        }
    }

    module.exports = resolvers;
