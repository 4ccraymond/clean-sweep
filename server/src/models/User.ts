import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email?: string;
  chores?: Types.ObjectId[];
  household: Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    match: [/.+@.+\..+/, 'Must be a valid email address'],
  },
  chores: [{
    type: Schema.Types.ObjectId,
    ref: 'Chore',
    default: [],
  }],
  household: {
    type: Schema.Types.ObjectId,
    ref: 'Household',
  },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;