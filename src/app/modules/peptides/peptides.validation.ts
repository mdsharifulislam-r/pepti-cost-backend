import { z } from 'zod';

const createPeptidesZodSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }),
    }),
});



const updatePeptidesZodSchema = z.object({
    body: z.object({
        name: z.string().optional(),
    }),
});



export const PeptidesValidations = {
    createPeptidesZodSchema,
    updatePeptidesZodSchema
};
