const express = require('express');
const router = express.Router();
const { Post, User, Tag } = require('../models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Tag,
          through: { attributes: [] } // hide PostTag details
        }
      ]
    });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const post = await Post.findByPk(id, {
    include: [
      {
        model: Tag,
        through: { attributes: [] }
      }
    ]
  });
  res.json(post);
});

router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ error: "userId does not exist" });
    }

    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
