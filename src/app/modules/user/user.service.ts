import { TOrder, TUser } from './user.interface';
import UserModel from './user.model';

const createUserIntoDb = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};
const updateUserIntoDb = async (userId: number, user: TUser) => {
  await UserModel.updateOne({ userId }, { $set: user }, { new: true });

  const result = await UserModel.findOne({ userId });
  return result;
};

const addProductInUserIntoDb = async (userId: number, order: TOrder) => {
  const result = await UserModel.updateOne(
    { userId },
    {
      $set: {
        orders: order,
      },
    },
    { new: true },
  );
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
const deleteUserByIdIntoDb = async (userId: number) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

const getOrderByIdIntoDb = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};
const getUserOrdersTotalPrice = async (userId: number) => {
  const result = await UserModel.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
  ]);
  return result;
};

const userServices = {
  createUserIntoDb,
  updateUserIntoDb,
  addProductInUserIntoDb,
  getAllUserIntoDb,
  getUserByIdIntoDb,
  deleteUserByIdIntoDb,
  getOrderByIdIntoDb,
  getUserOrdersTotalPrice,
};

export default userServices;
