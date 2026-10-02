import { Model } from 'mongoose';
import { BLOG_TYPE } from '../../../enums/blog';

export type IPeptideInfo = {
  headline: string;
  content: string;
  thumbnail: string;
  pdf: string;
  status: 'active' | 'inactive' | 'delete';
  category: string;
  tags: string[];
};

export type PeptideInfoModel = Model<IPeptideInfo>;
