"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("./models");
const router = (0, express_1.Router)();
const safeList = async (res, loader) => {
    try {
        const items = await loader();
        res.json(items);
    }
    catch (error) {
        console.error('Resource fetch failed:', error);
        res.json([]);
    }
};
router.get('/api/users', async (_req, res) => {
    await safeList(res, () => models_1.User.find());
});
router.post('/api/users', async (req, res) => {
    try {
        const user = await models_1.User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        console.error('User creation failed:', error);
        res.status(500).json({ error: 'Unable to create user' });
    }
});
router.get('/api/teams', async (_req, res) => {
    await safeList(res, () => models_1.Team.find());
});
router.post('/api/teams', async (req, res) => {
    try {
        const team = await models_1.Team.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        console.error('Team creation failed:', error);
        res.status(500).json({ error: 'Unable to create team' });
    }
});
router.get('/api/activities', async (_req, res) => {
    await safeList(res, () => models_1.Activity.find().sort({ date: -1 }));
});
router.post('/api/activities', async (req, res) => {
    try {
        const activity = await models_1.Activity.create(req.body);
        res.status(201).json(activity);
    }
    catch (error) {
        console.error('Activity creation failed:', error);
        res.status(500).json({ error: 'Unable to create activity' });
    }
});
router.get('/api/leaderboard', async (_req, res) => {
    await safeList(res, () => models_1.LeaderboardEntry.find().sort({ score: -1 }));
});
router.post('/api/leaderboard', async (req, res) => {
    try {
        const entry = await models_1.LeaderboardEntry.create(req.body);
        res.status(201).json(entry);
    }
    catch (error) {
        console.error('Leaderboard entry creation failed:', error);
        res.status(500).json({ error: 'Unable to create leaderboard entry' });
    }
});
router.get('/api/workouts', async (_req, res) => {
    await safeList(res, () => models_1.Workout.find());
});
router.post('/api/workouts', async (req, res) => {
    try {
        const workout = await models_1.Workout.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        console.error('Workout creation failed:', error);
        res.status(500).json({ error: 'Unable to create workout' });
    }
});
exports.default = router;
