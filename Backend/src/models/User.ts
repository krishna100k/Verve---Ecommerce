import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userId?: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
