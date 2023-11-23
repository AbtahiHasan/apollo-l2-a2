import { Request, Response } from 'express';
import userServices from './user.service';
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const result = await userServices.createUserIntoDb(userData);
    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const userController = {
  createUser,
};

export default userController;
