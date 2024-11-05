import z from "zod";

export const authSchema = z.object({
    phone: z.string().min(10, {
        message: 'Please enter a valid 10 digit phone number',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters'
    })
});

export type authSchemaType = z.infer<typeof authSchema>;