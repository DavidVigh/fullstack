const express = require('express');
const router = express.Router();

const { User, Post, Tag } = require('../models');

router.get('/', async (req, res) => {
    const users = await User.findAll({
      include: [
        {
          model: Post,
          include: [{
            model: Tag,
            through: { attributes: [] }
          }]
        }
      ]});
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [
        {
          model: Post,
          include: [{
            model: Tag,
            through: { attributes: [] }
          }]
        }
      ]}
    );
    res.json(user);
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
