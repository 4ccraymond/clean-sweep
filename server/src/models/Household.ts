import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IHousehold extends Document {
  name: string;
  members: Types.ObjectId[];
  chores: Types.ObjectId[];
}

const householdSchema = new Schema<IHousehold>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  chores: [{
    type: Schema.Types.ObjectId,
    ref: 'Chore',
  }],
});

const Household = mongoose.model<IHousehold>('Household', householdSchema);
export default Household;