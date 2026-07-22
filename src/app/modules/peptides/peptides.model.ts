import { Schema, model } from 'mongoose';
import { IPeptides, PeptidesModel } from './peptides.interface'; 

const peptidesSchema = new Schema<IPeptides, PeptidesModel>({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'delete'],
    required: false,
    default: 'active',
  },
}, {
  timestamps: true
});

export const Peptides = model<IPeptides, PeptidesModel>('Peptides', peptidesSchema);
