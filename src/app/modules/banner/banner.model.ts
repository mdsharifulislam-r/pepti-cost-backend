import { Schema, model } from 'mongoose';
import { IBanner, BannerModel } from './banner.interface';

const bannerSchema = new Schema<IBanner, BannerModel>({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ["active", "inactive", "delete"],
    required: false,
    default: "active"
  }
}, {
  timestamps: true
});

export const Banner = model<IBanner, BannerModel>('Banner', bannerSchema);
