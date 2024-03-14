import { User } from "../user.model";
import { TOrderData, TUser } from "./user.interface";
interface UpdateSingleDataParams {
    userId: string;
    data: TUser
}
type OrderType = {
    userId: string
    orderData: TOrderData

}

const createUserIntoBD = async (userData: TUser) => {
    if (await User.isUserExists(userData.userId)) {
        throw new Error('User already exists')
    }
    const result = await User.create(userData)
    return result

}
const getAllUsersFromDB = async () => {
    const projection = {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
        _id: 0
    };
    const result = await User.find({}, projection)
    return result

}
const getSingleDataFromDB = async (userId: string) => {
    const projection = {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
        _id: 0
    };

    const result = await User.findOne({ userId }, projection)
    if (result) {
        return result
    }
    else {
        throw new Error('User not found')
    }

}
const updateSingleDataFromDB = async ({ userId, data }: UpdateSingleDataParams) => {
    const updateDoc = {
        ...data
    }

    const result = await User.updateOne({ userId }, updateDoc)
    if (result.modifiedCount === 1) {
        return result
    }
    else {
        throw new Error('User not found')
    }
}
const deleteUserFromDB = async (userId: string) => {
    const result = await User.deleteOne({ userId })
    if (result.deletedCount) {
        return result
    }
    else {
        throw new Error('User not found')
    }
    return result
}
const updateOrderDataFromDB = async ({ userId, orderData }: OrderType) => {
    const user: TUser | null = await User.findOneAndUpdate({ userId },
        { $push: { orders: orderData } },
        { new: true }
    )

    // if (user) {
    //     let updateDoc = {};

    //     if (user.orders && Array.isArray(user.orders)) {
    //         updateDoc = {
    //             ...user.toObject(),
    //             orders: [...user.orders, orderData]
    //         };
    //     } else {

    //         updateDoc = {
    //             ...user.toObject(),
    //             orders: [orderData]
    //         };
    //     }
    //     const result = await User.updateOne({ userId }, updateDoc);
    //     return result
    // }
    if (user) {
        return user
    }
    else {
        throw new Error('User not found')
    }



}

export const UserServices = {
    createUserIntoBD,
    getAllUsersFromDB,
    getSingleDataFromDB,
    updateSingleDataFromDB,
    deleteUserFromDB,
    updateOrderDataFromDB
}