import { z } from 'zod';

const createBannerValidation = z.object({
    body: z.object({
        title: z.string({ required_error: "Title is required" }),
        link: z.string().url().optional(),
        status: z.enum(["active", "inactive", "delete"]).optional(),
    }),
});

const updateBannerValidation = z.object({
    body: z.object({
        title: z.string({ required_error: "Title is required" }).optional(),
        link: z.string().optional(),
        status: z.enum(["active", "inactive", "delete"]).optional(),
    }),
});

export const BannerValidations = { createBannerValidation, updateBannerValidation };
