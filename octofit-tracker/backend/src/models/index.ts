import mongoose, { Schema, model, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  fitnessGoal: string;
  age: number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessGoal: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || model<IUser>('User', userSchema);

export interface ITeam extends Document {
  name: string;
  description: string;
  members: string[];
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: String, default: [] }],
  },
  { timestamps: true },
);

export const Team = mongoose.models.Team || model<ITeam>('Team', teamSchema);

export interface IActivity extends Document {
  userId: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

export const Activity = mongoose.models.Activity || model<IActivity>('Activity', activitySchema);

export interface ILeaderboardEntry extends Document {
  userId: string;
  score: number;
  rank: number;
  streak: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: String, required: true, unique: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
    streak: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export const LeaderboardEntry = mongoose.models.LeaderboardEntry || model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);

export interface IWorkout extends Document {
  name: string;
  duration: number;
  difficulty: string;
  focus: string;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, required: true },
    focus: { type: String, required: true },
  },
  { timestamps: true },
);

export const Workout = mongoose.models.Workout || model<IWorkout>('Workout', workoutSchema);
