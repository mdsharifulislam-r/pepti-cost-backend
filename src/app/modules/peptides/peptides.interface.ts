import { Model } from 'mongoose';

export type IPeptides = {
  name: string;
  status: 'active' | 'delete';
};

export type PeptidesModel = Model<IPeptides>;
