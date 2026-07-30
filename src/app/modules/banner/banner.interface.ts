import { Model } from 'mongoose';

export type IBanner = {
  image: string;
  status: "active" | "inactive" | "delete"
  title: string;
  link?: string
};

export type BannerModel = Model<IBanner>;
