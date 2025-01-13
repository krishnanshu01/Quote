import { quotes, users } from "../fakedb.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const User = mongoose.model("User"); //how to call instance
const Quote = mongoose.model("Quote");

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findOne({ _id }),
    quotes: async () => await Quote.find().populate("by", "_id firstName"), //now here is by is not id its an object
    iquote: async (_, {by}) => await Quote.find({by}),
    myprofile: async (_, {arg}, {userId}) => {
      if(!userId) throw new Error("You must logged in");
      return await User.findOne({_id: userId});
    }
  },
  //need to resolve quote if you want it
  User: {
    //you always get parent ex: (ur is parent that is user)
    quotes: async (ur) => await Quote.find({ by: ur._id }),
  },

  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (!user) {
        const hashedPassword = await bcrypt.hash(userNew.password, 12);
        const newUser = new User({
          ...userNew,
          password: hashedPassword,
        });
        return await newUser.save();
      }
      throw new Error("user already exist with this email");
    },
    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (user) {
        const passwordCheck = await bcrypt.compare(
          userSignin.password,
          user.password
        );
        if (passwordCheck) {
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET
          );
          return { token };
        }
      }
      throw new Error("userId or password is invalid");
    },
    createQuote: async (_, { quote }, { userId }) => {
      //1.ab quote tb he create hoga jb user logding hoga
      //2.aur jo token pass krenge usmain user id already mention hai jo ke unique hai
      //3.jo hmne context bnaya tha use directly use kr skte hai yha
      if (!userId) {
        throw new Error("Please Login to Create Quote");
      }
      const newQuote = await new Quote({
        quote,
        by: userId,
      });
      await newQuote.save();
      return "Quote Saved";
    },
  },
};

export default resolvers;
