import { z } from 'zod';

const fullNameSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
});

// Define Zod schema for FullAddress
const fullAddressSchema = z.object({
    city: z.string(),
    country: z.string(),
    street: z.string(),
});

// Define Zod schema for User
export const userValidationSchema = z.object({
    userId: z.string(),
    username: z.string(),
    password: z.string(),
    fullName: fullNameSchema,
    age: z.number(),
    email: z.string(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: fullAddressSchema,
});

export default userValidationSchema