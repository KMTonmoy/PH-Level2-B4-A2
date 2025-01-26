import { Schema, model } from 'mongoose';
import { Bicycle } from './bicycle.interface';

const bicycleSchema = new Schema<Bicycle>(
  {
    name: {
      type: String,
      required: [true, 'Bicycle name is required'],
    },
    image: {
      type: String,
      required: [true, 'Bicycle image is required'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    model: {
      type: String,
      required: [true, 'model is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
 
    type: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
        message: 'Type must be one of Mountain, Road, Hybrid, BMX, or Electric',
      },
      required: [true, 'Bicycle type is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BicycleModel = model<Bicycle>('Bicycle', bicycleSchema);
