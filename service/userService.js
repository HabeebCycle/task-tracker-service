import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import UserModel from "../model/user.js";

export const registerUserService = asyncHandler(async (user) => {
  const { name, username, password } = user;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const savedUser = await UserModel.create({
    name,
    username,
    password: hashPassword,
  });
  return savedUser;
});

export const loginUserService = asyncHandler(async (username, password) => {
  const user = await UserModel.findOne({ username });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return user;
    }
  }

  return undefined;
});

export const getUserProfileService = asyncHandler(async (username) => {
  const user = await UserModel.findOne({ username });
  return user;
});

export const getAllUsersProfileService = asyncHandler(async () => {
  const users = await UserModel.find();
  return users;
});
