/* eslint-disable @typescript-eslint/no-this-alias */
import { Model, Schema, model } from 'mongoose';
import { TFullAddress, TFullName, TOrderData, TUser, UserModel } from "./User/user.interface";
import bcrypt from 'bcrypt';
import config from "..";



const userNameSchema = new Schema<TFullName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
})
const addressSchema = new Schema<TFullAddress>({
    city: { type: String, required: true },
    country: { type: String, required: true },
    street: { type: String, required: true }
})
const orderSchema = new Schema<TOrderData>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
})

const userSchema = new Schema<TUser, UserModel>({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullName: {
        type: userNameSchema,
        required: [true, "User name is missing"]
    },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: {
        type: [String],
        required: true
    },
    address: {
        type: addressSchema,
        required: true
    },
    orders: [orderSchema]

})

userSchema.pre('save', async function (next) {
    const user = this
    user.password = await bcrypt.hash(user.password, Number(config.saltRounds))
    next()
})

userSchema.statics.isUserExists = async function (userId: string) {
    const existingUser = await User.findOne({ userId })
    return existingUser
}


export const User = model<TUser, UserModel>("User", userSchema)