import { z } from 'zod';

const createApplicationValidation = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }),
        email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
        phone: z.string({ required_error: 'Phone number is required' }),
        company_name: z.string().optional(),
        message: z.string({ required_error: 'Message is required' }),
    }),
});

const updateApplicationValidation = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email({ message: 'Invalid email address' }).optional(),
        phone: z.string().optional(),
        company_name: z.string().optional(),
        message: z.string().optional(),
        status: z.enum(['pending', 'reviewed', 'resolved', 'delete']).optional(),
    }),
});

export const ApplicationValidations = { createApplicationValidation, updateApplicationValidation };
