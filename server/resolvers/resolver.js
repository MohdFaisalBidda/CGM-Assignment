import * as dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_KEY, {
    expiresIn: "7d",
  });
};

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      return user;
    },
    getUsers: async (_, __, { user }) => {
      // if (!user) {
      //   throw new Error("Authentication required");
      // }
      return await User.find();
    },
  },
  Mutation: {
    signUp: async (_, { input }) => {
      const { firstName, lastName, email, phoneNumber, username, password } =
        input;

      const existingUserEmail = await User.findOne({ email });
      if (existingUserEmail) {
        throw new Error("Email already exists");
      }

      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        throw new Error("Username already exists");
      }

      const hashedPass = await bcrypt.hash(password, 10);

      const user = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        username,
        password: hashedPass,
        followers: 0,
      });

      await user.save();

      const token = generateToken(user);

      return { token, user };
    },

    signIn: async (_, { input }) => {
      const { email, password } = input;

      const user = await User.findOne({email});
      if (!user) {
        throw new Error("Invalid credentials");
      }

      const isValidPass = bcrypt.compare(password, user.password);
      if (!isValidPass) {
        throw new Error("Invalid credentials");
      }

      const token = generateToken(user);

      return { token, user };
    },

    followUser: async (_, __, { userId }, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }

      const userToFollow = await User.findById(userId);
      if (!userToFollow) {
        throw new Error("User not found");
      }

      userToFollow.followers += 1;
      await userToFollow.save();

      return userToFollow;
    },
  },
};

export default resolvers;
