const express = require('express');
const router = express.Router();
const { PostTag, Post, Tag } = require('../models');

// GET all posts with their tags
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

router.post('/', async (req, res) => {
    const postTag = await PostTag.create(req.body);
    res.json(postTag);
});

module.exports = router;
