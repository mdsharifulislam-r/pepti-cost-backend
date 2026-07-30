import { Schema, model } from 'mongoose';
import { IVendor, VendorModel } from './vendor.interface';

const vendorSchema = new Schema<IVendor, VendorModel>({
  name: {
    type: String,
    required: true,
  },
  is_verified: {
    type: Boolean,
    required: false,
    default: false
  },
  rating: {
    type: Number,
    required: true,
  },
  total_reviews: {
    type: Number,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  quality: {
    type: String,
    required: false,
  },
  has_discount: {
    type: Boolean,
    required: false,
    default: false
  },
  discount_amount: {
    type: Number,
    required: false,
  },
  website_url: {
    type: String,
    required: false,
  },
  peptide_amount: {
    type: Number,
    required: false,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'delete'],
    required: true,
    default: 'active'
  },
  coupon_code: {
    type: String,
    required: false
  },
  price_per_unit: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  unit: {
    type: Number,
    required: true,
  },
  discounted_price: {
    type: Number,
    required: false
  },
  peptide: {
    type: Schema.Types.ObjectId,
    ref: 'Peptides',
  },
  peptide_str: {
    type: String,
    required: false
  },
  delivery_cost: {
    type: Number,
    required: false,
    default: 0
  },
  payment_methods: {
    type: [String],
    enum: ["Credit/Debit Card", "Paypal", "Stripe", "Bank", "Apple Pay", "Google Pay"],
    required: false
  }
}, {
  timestamps: true,
});

export const Vendor = model<IVendor, VendorModel>('Vendor', vendorSchema);
