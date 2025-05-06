import mongoose, { Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email?: string;
  chores?: Types.ObjectId[];
  household: Types.ObjectId;
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
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

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;