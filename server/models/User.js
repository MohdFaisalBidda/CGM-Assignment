import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  username: String,
  password: String,
  followers: Number,
});

const User = mongoose.model("User", UserSchema);

export default User;
