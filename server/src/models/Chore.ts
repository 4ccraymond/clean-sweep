import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IChore extends Document {
  title: string;
  description?: string;
  completed: boolean;
  assignedTo?: Types.ObjectId;
  household: Types.ObjectId;
  repeatEvery?: number;
  lastCompleted?: Date;
}

const choreSchema = new Schema<IChore>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  household: {
    type: Schema.Types.ObjectId,
    ref: 'Household',
    required: true,
  },
  repeatEvery: {
    type: Number,
    required: false,
    min: 1,
  },
  lastCompleted: {
    type: Date,
    required: false,
  },
});

const Chore = mongoose.model<IChore>('Chore', choreSchema);
export default Chore;
