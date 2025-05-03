const express = require('express');
const router = express.Router();
const { getCollection } = require('../services/db'); // adjust path if needed

// GET /gallery - fetch all completed image generations
router.get('/', async (req, res) => {
  try {
    const collection = getCollection();
    const results = await collection
      .find({ 'image.image': { $exists: true } })
      .sort({ completedAt: -1 })
      .limit(30)
      .toArray();

    const images = results.map((doc) => ({
      prompt: doc.prompt,
      image: doc.image.image,
    }));

    res.json({ images });
  } catch (err) {
    console.error('Error fetching gallery:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
