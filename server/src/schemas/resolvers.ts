import User, {IUser} from '../models/User';
import Chore, {IChore} from '../models/Chore';
import Household, {IHousehold} from '../models/Household';
import { join } from 'path';
import mongoose, { Types } from 'mongoose';
import { AuthContext, signToken } from '../utils/auth';

const resolvers = {
  Query: {
    users: async (parent: any, _: any, context: AuthContext) => {
      if (!context.user) throw new Error ('Must be logged in');
      return User.find({ household: context.user.household });
    },

    user: async (_: any, {id}: { id: string }, context: AuthContext) => {
      if (!context.user) throw new Error ('must be logged in');
      const user = await User.findById(id);
      if (!user || user.household?.toString() !==  context.user.household) {
        throw new Error ('Access Denied');
      }
      return user;
    },

    chores: async (parent: any, _: any, context: AuthContext) => {
      if (!context.user) throw new Error ('Must be logged in');
      return Chore.find({ household: context.user.household });
    },

    chore: async (_: any, {id}: { id: string }, context: AuthContext) => {
      if (!context.user) throw new Error ('must be logged in');
      const chore = await Chore.findById(id);
      if (!chore || chore.household?.toString() !==  context.user.household) {
        throw new Error ('Access Denied');
      }
      return chore;
    },

    choreAssignments: async (parent: any, _: any, context: AuthContext) => {
      if (!context.user) throw new Error ('Must be logged in');
      return Chore.find({ household: context.user.household }).populate('assignedTo');
    },

    households: async (parent: any, _: any, context: AuthContext) => {
      if (!context.user) throw new Error ('Must be logged in');
      return Household.find({ _id: context.user.household });
    },

    household: async (_: any, {id}: { id: string }, context: AuthContext) => {
      if (!context.user) throw new Error ('must be logged in');
      if (id !== context.user.household) {
        throw new Error ('Access denied');
      }
      return Household.findById(id);
      },
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
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await User.findOne({ email });
    
      if (!user || !user.email) {
        throw new Error('User not found');
      }
    
      const isValid = await user.isCorrectPassword(password);
      if (!isValid) {
        throw new Error('Incorrect password');
      }
    
      const token = signToken({ email: user.email, userName: user.username });
    
      return { token, user };
    },

    addChore: async (
      _: any,
      { 
        title, 
        description, 
        assignedTo, 
        household,
        repeatEvery,
        lastCompleted, 
      }: { 
        title: string; 
        description?: string; 
        assignedTo?: string; 
        household: string;
        repeatEvery?: number;
        lastCompleted?: string;
      },
      context: AuthContext
    ) => {
      if (!context.user) {
        throw new Error ('Must be logged in');
      } 
      const newChore = await Chore.create({ 
        title, 
        description, 
        assignedTo, 
        household,
        repeatEvery,
        lastCompleted: lastCompleted ? new Date(lastCompleted): undefined,
      });
      await Household.findByIdAndUpdate(household, { 
        $push: { chores: newChore._id },
      });

      return newChore;
    },

    markChoreCompleted: async (
      _: any,
      { 
        choreId, 
        completed 
      }: { 
        choreId: string; 
        completed: boolean 
      }
    ) => {
      const updates: any = { completed};
      if (completed) {
        updates.lastCompleted = new Date();
      }

      const updatedChore = await Chore.findByIdAndUpdate(
        choreId, 
        updates,
        { new: true }
      );

      return updatedChore;
    },

    assignChore: async (
      _: any,
      { 
        choreId, 
        userId
      }: { 
        choreId: string; 
        userId: string 
      },
      
      context: AuthContext) => { 

        if (!context.user) {
          throw new Error ('Must be logged in')
        }

      const updatedChore = await Chore.findByIdAndUpdate(
        choreId, 
        { assignedTo: userId }, 
        { new: true }
      );

      return updatedChore;
    },

    updateChore: async (
      _: any,
      { 
        choreId, 
        title, 
        description, 
        completed,
        assignedTo,
        repeatEvery,
        lastCompleted,
      }: {
        choreId: string;
        title?: string;
        description?: string;
        completed?: boolean;
        assignedTo?: string;
        repeatEvery?: number;
        lastCompleted?: string;
      },
      context: AuthContext
    ) => {
      if (!context.user) {
        throw new Error ('Must be logged in');
      } 
      const updates: any = {};
      if (title !== undefined) updates.title = title;
      if (description !== undefined) updates.description = description;
      if (completed !== undefined) updates.completed = completed;
      if (assignedTo !== undefined) updates.assignedTo = assignedTo;
      if (repeatEvery !== undefined) updates.repeatEvery = repeatEvery;
      if (lastCompleted !== undefined) updates.lastCompleted = new Date (lastCompleted);

      const updatedChore = await Chore.findByIdAndUpdate(
        choreId, 
        updates, 
        { new: true }
      );

      return updatedChore;
    },

    deleteChore: async (
      _: any,
      { choreId }: { choreId: string },
      context: AuthContext
    ) => {
      if (!context.user) {
        throw new Error ('Must be logged in');
      }

      const deletedChore = await Chore.findByIdAndDelete(choreId);
      
      if (!deletedChore) {
        throw new Error ('Chore not found');
      }
      
        await Household.findByIdAndUpdate(deletedChore.household, { 
          $pull: { chores: choreId },
        });

      if (deletedChore.assignedTo) {
        await User.findByIdAndUpdate(deletedChore.assignedTo, { 
          $pull: { chores: choreId },
        });
      }
      
      return deletedChore;
    },

    unassignChore: async (
      _: any,
      { choreId }: { choreId: string },
      context: AuthContext
      ) => {
 if (!context.user) {
    throw new Error ('Must be logged in');
  }

        const chore = await Chore.findById(choreId);

        if (!chore) {
          throw new Error('Chore not found');
        }

        if (!chore.assignedTo) {
          throw new Error('Chore is not assigned to anyone');
        }

        await User.findByIdAndUpdate(chore.assignedTo, {
          $pull: { chores: choreId },
        });

        chore.assignedTo = undefined;
        await chore.save();
      
      return chore;
    },

    clearCompletedChores: async () => {
      const completedChores = await Chore.find({ completed: true });
      
      for (const chore of completedChores) {
        await Household.findByIdAndUpdate(chore.household, { 
          $pull: { chores: chore._id },
        });

        if (chore.assignedTo) {
          await User.findByIdAndUpdate(chore.assignedTo, {
            $pull: { chores: chore._id },
          });
        }
      }

      await Chore.deleteMany({ completed: true });

      return completedChores;
    },

    resetRecurringChores: async () => {
      const now = new Date();
    
      const chores = await Chore.find({
        repeatEvery: { $exists: true },
        lastCompleted: { $exists: true },
        completed: true,
      });
    
      const resetChores: IChore[] = [];
    
      for (const chore of chores) {
        const daysSinceLast =
          (now.getTime() - new Date(chore.lastCompleted!).getTime()) / (1000 * 60 * 60 * 24);
    
        if (daysSinceLast >= (chore.repeatEvery || 0)) {
          chore.completed = false;
          await chore.save();
          resetChores.push(chore);
        }
      }
    
      return resetChores.sort((a, b) => a.title.localeCompare(b.title));
    },    

    addUser: async (
      _: any,
       { 
        username, 
        email, 
        password,
        household
      }: {
        username: string; 
        email?: string; 
        password: string;
        household: string 
      }
    ) => {
      const newUser = await User.create({ username, email, password, household });
      await Household.findByIdAndUpdate(household, {
        $push: { members: newUser._id },
      });
      return newUser;
    },

    updateUser: async (
      _: any,
      { 
        userId,
        username, 
        email, 
        household 
      }: { 
        userId: string; 
        username?: string; 
        email?: string; 
        household?: string 
      }
    ) => {
      const updates: any = {};
      if (username !== undefined) updates.username = username;
      if (email !== undefined) updates.email = email;
      if (household !== undefined) updates.household = household;

      const updatedUser = await User.findByIdAndUpdate(
        userId, 
        updates, 
        { new: true }
      );

      return updatedUser;
    },

    joinHousehold: async (
      _: any,
      { userId, householdId }: { userId: string; householdId: string }
    ) => {
      const user = await User.findById(userId);
      const household = await Household.findById(householdId);
    
      if (!user || !household) {
        throw new Error('User or Household not found');
      }
    
      const oldHouseholdId = user.household;
    
      user.household = new mongoose.Types.ObjectId(householdId);
    
      if (oldHouseholdId) {
        await Household.findByIdAndUpdate(
          oldHouseholdId as Types.ObjectId,
          { $pull: { members: user._id } }
        );
      }
            
      await user.save();
      await household.save();
    
      return user;
    },

    deleteUser: async (
      _: any,
      { userId }: { userId: string }
    ) => {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (deletedUser) {
        await Household.findByIdAndUpdate(deletedUser.household, { 
          $pull: { members: userId },
        });
      } else {
        throw new Error('User not found');
      }

      return deletedUser;
    },

    addHousehold: async (
      _: any,
      { name }: { name: string }
    ) => {
      const newHousehold = await Household.create({ name });
      return newHousehold;
    },

    updateHousehold: async (
      _: any,
      { householdId, name }: { householdId: string; name: string }
    ) => {
      const updatedHousehold = await Household.findByIdAndUpdate(
        householdId, 
        { name }, 
        { new: true }
      );

      return updatedHousehold;
    },

    deleteHousehold: async (
      _: any,
      { householdId }: { householdId: string }
    ) => {
      const deletedHousehold = await Household.findByIdAndDelete(householdId);
      if (deletedHousehold) {
        await User.updateMany(
          { household: householdId },
          { $set: { household: null } }
        );
      } else {
        throw new Error('Household not found');
      }

      return deletedHousehold;
    },
  },
};

export default resolvers;