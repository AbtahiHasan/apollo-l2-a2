import { Request, Response } from 'express';
import { fromZodError } from 'zod-validation-error';
import userServices from './user.service';
import userValidationSchema, { orderSchema } from './user.validation';
import UserModel from './user.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParsedData = userValidationSchema.safeParse(userData);

    if (zodParsedData.success) {
      const result = await userServices.createUserIntoDb(zodParsedData.data);
      res.status(200).json({
        success: true,
        message: 'user created successfully!',
        data: result,
      });
    } else {
      const error = fromZodError(zodParsedData.error);
      return res.status(500).json({
        success: false,
        message: error.message || 'internal server error',
        error: {
          code: 400,
          description: error.details,
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'internal server error',
      error: {
        code: 500,
        description: error.message,
      },
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

    const result = await userServices.updateUserIntoDb(
      Number(userId),
      userData,
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
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

const addProductInOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;
    const productData = req.body;
    const zodParsedProduct = orderSchema.safeParse(productData);
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

    if (zodParsedProduct.success) {
      await UserModel.updateOne(
        { userId },
        {
          $push: {
            orders: zodParsedProduct.data,
          },
        },
      );

      return res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      const error = fromZodError(zodParsedProduct.error);
      return res.status(500).json({
        success: false,
        message: error.message || 'internal server error',
        error: {
          code: 400,
          description: error.details,
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'internal server error',
      error: {
        code: 500,
        description: error.message,
      },
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
      error: {
        code: 500,
        description: error.message,
      },
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
      error: {
        code: 500,
        description: error.message,
      },
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
      error: {
        code: 500,
        description: error.message,
      },
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
      error: {
        code: 500,
        description: error.message,
      },
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
      data: {
        totalPrice: Number.isInteger(result[0]?.totalPrice)
          ? result[0]?.totalPrice
          : parseFloat(result[0]?.totalPrice.toFixed(2)) || 0,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'internal server error',
      error: {
        code: 500,
        description: error.message,
      },
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
