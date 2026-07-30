import { Model } from 'mongoose';

export type ISupport = {
  name: string;
  email: string;
  contact: string;
  message: string;
  reply?: string;
  status: "pending" | "resolved"
};

export type SupportModel = Model<ISupport>;
