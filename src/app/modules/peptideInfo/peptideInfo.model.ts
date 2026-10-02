import { Schema, model } from 'mongoose';
import { IPeptideInfo, PeptideInfoModel } from './peptideInfo.interface';
import { BLOG_TYPE } from '../../../enums/blog';

const peptideInfoSchema = new Schema<IPeptideInfo, PeptideInfoModel>({
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
  pdf: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
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
  timestamps: true,
});

export const PeptideInfo = model<IPeptideInfo, PeptideInfoModel>('PeptideInfo', peptideInfoSchema);
