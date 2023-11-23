import express from 'express';
import userController from './user.controller';

const router = express.Router();
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.delete('/:userId', userController.deleteUserById);

export const userRouter = router;
