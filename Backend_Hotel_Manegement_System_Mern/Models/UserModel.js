import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "profile.png",
  },
  role: {
    type: String,
    default: "user",
  },
});

let UserModel = mongoose.model("User", UserSchema);

export default UserModel
