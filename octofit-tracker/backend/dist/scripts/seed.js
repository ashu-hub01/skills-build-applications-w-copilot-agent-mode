"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const models_1 = require("../models");
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await (0, database_1.connectDatabase)();
        console.log('Connected to octofit_db');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.LeaderboardEntry.deleteMany({}),
            models_1.Workout.deleteMany({}),
        ]);
        const users = await models_1.User.insertMany([
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
        await models_1.Team.insertMany([
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
        await models_1.Activity.insertMany([
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
        await models_1.LeaderboardEntry.insertMany([
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
        await models_1.Workout.insertMany([
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
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
