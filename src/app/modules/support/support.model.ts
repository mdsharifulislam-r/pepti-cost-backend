import { Schema, model } from 'mongoose';
import { ISupport, SupportModel } from './support.interface';

const supportSchema = new Schema<ISupport, SupportModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending',
  }
}, { timestamps: true });

export const Support = model<ISupport, SupportModel>('Support', supportSchema);
