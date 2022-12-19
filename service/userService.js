import bcrypt from "bcrypt";
import UserModel from "../model/user.js";

export const registerUserService = async (user) => {
  const hashPassword = await bcrypt.hash(
    user.password,
    process.env.PASSWORD_SALT
  );
  user.password = hashPassword;
  const savedUser = await UserModel.create(user);
  return savedUser;
};

export const loginUserService = async (username, password) => {
  const user = await UserModel.findOne({ username });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return user;
    }
  }

  return undefined;
};

export const getUserProfileService = async (username) => {
  return await UserModel.findOne({ username });
};

export const getAllUsersProfileService = async () => {
  return await UserModel.find();
};
