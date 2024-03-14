import { Model } from "mongoose";
import { type } from './user.interface';

export type TFullName = {
    firstName: string,
    lastName: string
}
type Hobbies = string[];
export type TFullAddress = {
    street: string,
    city: string,
    country: string
}
export type TOrderData = {
    productName: string
    price: number
    quantity: number
}

export type TUser = {
    userId: string,
    username: string,
    password: string,
    fullName: TFullName,
    age: number,
    email: string,
    isActive: boolean,
    hobbies: Hobbies,
    address: TFullAddress,
    orders?: TOrderData[]

}
export interface UserModel extends Model<TUser> {
    isUserExists(userId: string): Promise<TUser | null>
}