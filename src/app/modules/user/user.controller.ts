import { Request, Response } from 'express';
import userServices from './user.service';
import userValidationSchema from './user.validation';
import UserModel from './user.model';
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParsedData = userValidationSchema.parse(userData);

    const result = await userServices.createUserIntoDb(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'internal server error',
      error: error,
      // error: {
      //   code: 400,
      //   description: 'User not found!',
      // },
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;
    const userData = req.body;

    const userIsExists = await UserModel.isUserExists(Number(userId));
    if (!userIsExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const zodParsedData = userValidationSchema.parse(userData);

    const result = await userServices.updateUserIntoDb(
      Number(userId),
      zodParsedData,
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'internal server error',
      error: error,
      // error: {
      //   code: 400,
      //   description: 'User not found!',
      // },
    });
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserIntoDb();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'internal server error',
      error: error,
      // error: {
      //   code: 400,
      //   description: 'User not found!',
      // },
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userIsExists = await UserModel.isUserExists(Number(userId));
    if (!userIsExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const result = await userServices.getUserByIdIntoDb(Number(userId));

    return res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'internal server error',
      error: error,
      // error: {
      //   code: 400,
      //   description: 'User not found!',
      // },
    });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userIsExists = await UserModel.isUserExists(Number(userId));
    if (!userIsExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const result = await userServices.deleteUserByIdIntoDb(Number(userId));

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'internal server error',
      error: error,
      // error: {
      //   code: 400,
      //   description: 'User not found!',
      // },
    });
  }
};

const userController = {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUserById,
};

export default userController;
