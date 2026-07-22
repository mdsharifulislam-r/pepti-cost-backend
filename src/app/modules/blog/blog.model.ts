import { Schema, model } from 'mongoose';
import { IBlog, BlogModel } from './blog.interface'; 
import { BLOG_TYPE } from '../../../enums/blog';

const blogSchema = new Schema<IBlog, BlogModel>({
  headline: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum:Object.values(BLOG_TYPE),
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'delete'],
    required: false,
    default: 'active',
  },
}, {
  timestamps: true
});

export const Blog = model<IBlog, BlogModel>('Blog', blogSchema);
