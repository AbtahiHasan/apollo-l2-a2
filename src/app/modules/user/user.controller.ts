import { Request, Response } from 'express';
import userServices from './user.service';
import userValidationSchema from './user.validation';
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

const userController = {
  createUser,
  getAllUsers,
};

export default userController;
