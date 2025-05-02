import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User, {IUser} from './models/User';
import Chore from './models/Chore';
import Household from './models/Household';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to database');

    // Clear old data
    await User.deleteMany({});
    await Chore.deleteMany({});
    await Household.deleteMany({});

    // Create household
    const household = await Household.create({ name: 'Raymond Family' });

    // Create users
    const [alice, bob, charlie, daisy] = await User.insertMany([
      { username: 'alice', email: 'alice@example.com', password: 'password123', household: household._id },
      { username: 'bob', email: 'bob@example.com', password: 'password123', household: household._id },
      { username: 'charlie', password: 'password123', household: household._id },
      { username: 'daisy', password: 'password123', household: household._id },
    ]);    

    // Create chores
    const chores = await Chore.insertMany([
      { title: 'Take out trash', completed: false, assignedTo: alice._id, household: household._id },
      { title: 'Do dishes', completed: true, assignedTo: bob._id, household: household._id },
      { title: 'Vacuum living room', completed: false, assignedTo: charlie._id, household: household._id },
    ]);

    // Link chores to household
    household.members = [alice, bob, charlie, daisy].map((u) => u._id as mongoose.Types.ObjectId);
    household.chores = chores.map((c) => c._id as mongoose.Types.ObjectId);

    await household.save();

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
