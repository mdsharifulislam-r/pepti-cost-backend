import { Schema, model } from 'mongoose';
import { IApplication, ApplicationModel } from './application.interface';

const applicationSchema = new Schema<IApplication, ApplicationModel>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  company_name: {
    type: String,
    required: false,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved', 'delete'],
    required: false,
    default: 'pending',
  },
}, {
  timestamps: true,
});

export const Application = model<IApplication, ApplicationModel>('Application', applicationSchema);
