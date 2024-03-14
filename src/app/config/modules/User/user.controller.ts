import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.zod.validation";


const createUser = async (req: Request, res: Response) => {
    try {
        const { user } = req.body
        const parseZodData = userValidationSchema.parse(user)
        const result = await UserServices.createUserIntoBD(parseZodData)
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "user is not insert succesfully",
            data: error
        })
    }
}
const getAllUsers = async (req: Request, res: Response) => {
    try {

        const result = await UserServices.getAllUsersFromDB()
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result
        })

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Users fetched faild",
            data: error
        })
    }
}
const getSingleData = async (req: Request, res: Response) => {
    const { userId } = req.params
    try {
        const result = await UserServices.getSingleDataFromDB(userId)
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result
        })

    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }

}
const updatesingleData = async (req: Request, res: Response) => {
    const { userId } = req.params
    const { user } = req.body
    try {
        const result1 = await UserServices.updateSingleDataFromDB({ userId, data: user })
        const result2 = await UserServices.getSingleDataFromDB(userId)
        if (result1 && result2) {
            res.status(200).json({
                success: true,
                message: "User updated successfully!",
                data: result2
            })
        }
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }
}
const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params

    try {
        const result = await UserServices.deleteUserFromDB(userId)
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: result.deletedCount && null
        })

    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }
}
const updateOrderData = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const orderData = req.body
        const result = await UserServices.updateOrderDataFromDB({ userId, orderData })
        if (result) {
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: null
            })
        }

    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }
}

export const UserController = {
    createUser,
    getAllUsers,
    getSingleData,
    updatesingleData,
    deleteUser,
    updateOrderData
}