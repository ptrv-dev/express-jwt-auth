import { Schema, model, Types } from 'mongoose';

const tokenSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const TokenModel = model('Token', tokenSchema);
