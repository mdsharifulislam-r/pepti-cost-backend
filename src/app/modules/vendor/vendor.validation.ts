import { z } from 'zod';

const createVendorZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),

    is_verified: z.boolean({ required_error: 'Is verified is required' }),

    rating: z.number({ required_error: 'Rating is required' }),

    total_reviews: z.number({
      required_error: 'Total reviews is required',
    }),

    peptide: z.string({ required_error: 'Peptide is required' }),

    about: z.string({ required_error: 'About is required' }),

    price_per_unit: z.number({
      required_error: 'Price per unit is required',
    }),

    unit: z.number({
      required_error: 'Unit is required',
    }),

    quality: z.string().optional(),

    has_discount: z.boolean().optional(),

    discount_amount: z.number().min(0).max(100).optional(),

    coupon_code: z.string().optional(),

    website_url: z
      .string({
        required_error: 'Website URL is required',
      })
      .url({
        message: 'Website URL is invalid',
      }),
  }),
});

const updateVendorZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),

    is_verified: z.boolean().optional(),

    rating: z.number().optional(),

    total_reviews: z.number().optional(),

    about: z.string().optional(),

    price_per_unit: z.number().optional(),

    total_price: z.number().optional(),

    unit: z.number().optional(),

    quality: z.string().optional(),

    has_discount: z.boolean().optional(),

    discount_amount: z.number().optional(),

    coupon_code: z.string().optional(),

    website_url: z
      .string()
      .url({
        message: 'Website URL is invalid',
      })
      .optional(),

    discounted_price: z.number().optional(),
  }),
});

export const VendorValidations = {
  createVendorZodSchema,
  updateVendorZodSchema,
};
