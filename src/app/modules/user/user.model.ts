/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserModel, TOrder, TUser } from './user.interface';
import config from '../../config';

const orderSchema = new Schema<TOrder>(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);
const userSchema = new Schema<TUser, IUserModel>({
  userId: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  fullName: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
  hobbies: [String],
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  orders: [orderSchema],
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

const UserModel = model<TUser, IUserModel>('User', userSchema);
export default UserModel;
