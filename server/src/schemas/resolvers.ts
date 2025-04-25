import User, {IUser} from '../models/User';
import Chore, {IChore} from '../models/Chore';
import Household, {IHousehold} from '../models/Household';

const resolvers = {
  Query: {
    users: async () => User.find({}),
    user: async (_:any, { id }: { id: string }) => User.findById(id),

    chores: async () => Chore.find({}),
    chore: async (_:any, { id }: { id: string }) => Chore.findById(id),

    households: async () => Household.find({}),
    household: async (_:any, { id }: { id: string }) => Household.findById(id),
  },

  User: {
    chores: async (user: IUser) => Chore.find({ assignedTo: user._id }),
    household: async (user: IUser) => Household.findById(user.household),
  },

  Chore: {
    assignedTo: async (chore: IChore) => User.findById(chore.assignedTo),
    household: async (chore: IChore) => Household.findById(chore.household),
  },

  Household: {
    members: async (household: IHousehold) => User.find({ household: household._id }),
    chores: async (household: IHousehold) => Chore.find({ household: household._id }),
  },

  Mutation: {
    addChore: async (
      _: any,
      { 
        title, 
        description, 
        assignedTo, 
        household 
      }: { 
        title: string; 
        description?: string; 
        assignedTo?: string; 
        household: string 
      }
    ) => {
      const newChore = await Chore.create({ title, description, assignedTo, household });
      await Household.findByIdAndUpdate(household, { 
        $push: { chores: newChore._id },
      });

      return newChore;
    },
  },
};

export default resolvers;