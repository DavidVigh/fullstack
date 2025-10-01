const express = require('express');
const router = express.Router();

const { Users } = require('../models');

router.get('/', async (req, res) => {
    const users = await Users.findAll();
    res.status(204).json(users);
});

router.post('/', async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;