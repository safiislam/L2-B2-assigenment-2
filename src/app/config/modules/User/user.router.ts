import express from 'express';
import { UserController } from './user.controller';

const router = express.Router()


router.post("/", UserController.createUser)
router.get('/', UserController.getAllUsers)
router.get('/:userId', UserController.getSingleData)
router.put('/:userId', UserController.updatesingleData)
router.delete('/:userId', UserController.deleteUser)
router.put('/:userId/orders', UserController.updateOrderData)

export const UserRouters = router