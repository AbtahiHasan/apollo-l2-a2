import { User } from './user.interface';
import UserModel from './user.model';

const createUserIntoDb = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};
const getAllUserIntoDb = async () => {
  const result = await UserModel.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};
const getUserByIdIntoDb = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

const userServices = {
  createUserIntoDb,
  getAllUserIntoDb,
  getUserByIdIntoDb,
};

export default userServices;
