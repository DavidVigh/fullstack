const express = require('express');
const router = express.Router();

const { Users } = require('../models');

router.get('/', async (req, res) => {
    const users = await Users.findAll();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const user = await Users.findByPk(id);
    res.json(user);
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