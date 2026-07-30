import { Model } from 'mongoose';

export type IApplication = {
  name: string;
  email: string;
  phone: string;
  company_name?: string;
  message: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'delete';
};

export type ApplicationModel = Model<IApplication>;
