import mongoose, { Schema } from "mongoose";

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
    maxLength: 255,
    minLength: 3,
  },
  role: {
    type: String,
    enum: ["admin", "user", "guest"],
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    maxLength: 20,
    minLength: 3,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
