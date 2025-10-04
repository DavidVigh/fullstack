const express = require('express');
const router = express.Router();

const { Tag } = require('../models');

router.get('/', async (req, res) => {
    const tags = await Tag.findAll();
    res.json(tags);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const tag = await Tag.findByPk(id);
    res.json(tag);
});

router.post('/', async (req, res) => {
    const tag = await Tag.create(req.body);
    res.json(tag);
})

module.exports = router;