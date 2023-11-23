import { User } from './user.interface';
import UserModel from './user.model';

const createUserIntoDb = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const userServices = {
  createUserIntoDb,
};

export default userServices;
