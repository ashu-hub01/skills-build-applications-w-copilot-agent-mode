import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        fitnessGoal: 'Improve endurance',
        age: 29,
      },
      {
        name: 'Jordan Rivera',
        email: 'jordan.rivera@example.com',
        fitnessGoal: 'Build strength',
        age: 34,
      },
      {
        name: 'Aisha Patel',
        email: 'aisha.patel@example.com',
        fitnessGoal: 'Stay consistent',
        age: 27,
      },
    ]);

    await Team.insertMany([
      {
        name: 'Night Owls',
        description: 'Early morning and evening training group',
        members: users.slice(0, 2).map((user) => user._id.toString()),
      },
      {
        name: 'Peak Performers',
        description: 'Competitive strength and mobility squad',
        members: [users[2]._id.toString()],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'Run',
        duration: 45,
        caloriesBurned: 540,
        date: new Date('2026-07-02T06:30:00.000Z'),
      },
      {
        userId: users[1]._id.toString(),
        type: 'Strength Training',
        duration: 60,
        caloriesBurned: 720,
        date: new Date('2026-07-02T18:00:00.000Z'),
      },
      {
        userId: users[2]._id.toString(),
        type: 'Yoga',
        duration: 35,
        caloriesBurned: 220,
        date: new Date('2026-07-03T07:00:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: users[0]._id.toString(),
        score: 940,
        rank: 1,
        streak: 8,
      },
      {
        userId: users[1]._id.toString(),
        score: 892,
        rank: 2,
        streak: 5,
      },
      {
        userId: users[2]._id.toString(),
        score: 874,
        rank: 3,
        streak: 6,
      },
    ]);

    await Workout.insertMany([
      {
        name: 'Tempo Run',
        duration: 30,
        difficulty: 'Intermediate',
        focus: 'Cardio',
      },
      {
        name: 'Full Body Strength',
        duration: 45,
        difficulty: 'Advanced',
        focus: 'Strength',
      },
      {
        name: 'Recovery Flow',
        duration: 20,
        difficulty: 'Beginner',
        focus: 'Mobility',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
