import { z } from 'zod';
import { BLOG_TYPE } from '../../../enums/blog';

const createPeptideInfoZodSchema = z.object({
  body: z.object({
    headline: z.string({ required_error: 'Headline is required' }),
    content: z.string({ required_error: 'Content is required' }),
    category: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

export const PeptideInfoValidations = {
  createPeptideInfoZodSchema,
};
