import express from 'express';
import userController from './user.controller';

const router = express.Router();
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.delete('/:userId', userController.deleteUserById);
// orders
router.put('/:userId/orders', userController.addProductInOrder);
router.get('/:userId/orders', userController.getUserOrders);
router.get(
  '/:userId/orders/total-price',
  userController.getUserOrdersTotalPrice,
);

export const userRouter = router;
