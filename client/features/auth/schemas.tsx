import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1,"Required")
})

export const registerSchema = z.object({
    name: z.string(),
    email: z.string().trim().min(1,"required").email(),
    password: z.string().min(1,"required").max(256)
});