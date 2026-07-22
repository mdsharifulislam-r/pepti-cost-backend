import { Model } from 'mongoose';
import { BLOG_TYPE } from '../../../enums/blog';

export type IBlog = {
  headline: string;
  content: string;
  thumbnail: string;
  status:"active" | "inactive" | "delete",
  category:BLOG_TYPE,
  tags: string[]
};

export type BlogModel = Model<IBlog>;
