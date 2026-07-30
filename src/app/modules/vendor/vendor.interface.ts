import { Model, Types } from 'mongoose';

export type IVendor = {
  name: string;
  is_verified: boolean;
  rating: number;
  total_reviews: number;
  about: string;
  price_per_unit: number;
  peptide: Types.ObjectId;
  peptide_str?: string
  total_price: number;
  unit: number
  quality?: string;
  has_discount?: boolean;
  discount_amount?: number;
  is_stock?: boolean;
  delivery_cost?: number;
  payment_methods: (
    "Credit/Debit Card" | "Paypal" | "Stripe" | "Bank" | "Apple Pay" | "Google Pay"
  )[]
  coupon_code?: string;
  website_url: string;
  discounted_price?: number;
  peptide_amount?: number;
  status: "active" | "delete";
};

export type VendorModel = Model<IVendor>;
