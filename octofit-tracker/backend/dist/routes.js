"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("./models");
const router = (0, express_1.Router)();
router.get('/api/users', async (_req, res) => {
    const users = await models_1.User.find();
    res.json(users);
});
router.post('/api/users', async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json(user);
});
router.get('/api/teams', async (_req, res) => {
    const teams = await models_1.Team.find();
    res.json(teams);
});
router.post('/api/teams', async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json(team);
});
router.get('/api/activities', async (_req, res) => {
    const activities = await models_1.Activity.find().sort({ date: -1 });
    res.json(activities);
});
router.post('/api/activities', async (req, res) => {
    const activity = await models_1.Activity.create(req.body);
    res.status(201).json(activity);
});
router.get('/api/leaderboard', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find().sort({ score: -1 });
    res.json(leaderboard);
});
router.post('/api/leaderboard', async (req, res) => {
    const entry = await models_1.LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
});
router.get('/api/workouts', async (_req, res) => {
    const workouts = await models_1.Workout.find();
    res.json(workouts);
});
router.post('/api/workouts', async (req, res) => {
    const workout = await models_1.Workout.create(req.body);
    res.status(201).json(workout);
});
exports.default = router;
