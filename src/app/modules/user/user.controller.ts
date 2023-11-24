import { Request, Response } from 'express';
import userServices from './user.service';
import userValidationSchema, { orderSchema } from './user.validation';
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

const addProductInOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;
    const productData = req.body;
    const zodParsedProduct = orderSchema.parse(productData);
    const user = await UserModel.isUserExists(Number(userId));
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    await UserModel.updateOne(
      { userId },
      {
        $push: {
          orders: zodParsedProduct,
        },
      },
    );

    return res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
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
    await userServices.deleteUserByIdIntoDb(Number(userId));

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
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

const getUserOrders = async (req: Request, res: Response) => {
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
    const orders = await userServices.getOrderByIdIntoDb(Number(userId));

    return res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: { orders: orders?.orders },
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

const getUserOrdersTotalPrice = async (req: Request, res: Response) => {
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
    const result = await userServices.getUserOrdersTotalPrice(Number(userId));

    return res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice: result[0]?.totalPrice || 0 },
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
  addProductInOrder,
  getAllUsers,
  getUserById,
  deleteUserById,
  getUserOrders,
  getUserOrdersTotalPrice,
};

export default userController;
