import { z } from 'zod';

export const orderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.string().array(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(orderSchema).optional(),
});

export default userValidationSchema;
