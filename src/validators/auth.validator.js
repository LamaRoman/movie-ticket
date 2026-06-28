import {z} from 'zod'

export const registerSchema = z.object({
    name : z.string().min(3,"Minimum characters"),
    email: z.email("Invalid email"),
    password:z.string().min(8,"Minimum 8 characters")
    .regex(/[A-Z]/,"Must contain one uppercase letter")
    .regex(/[0-9]/,"Must contain one number")
    .regex(/[^a-zA-Z0-9]/,"Must have one special character")
})

export const loginSchema = z.object({
    email: z.email("Invalid email"),
    password:z.string().min(8,"Minimum 8 characters")

})