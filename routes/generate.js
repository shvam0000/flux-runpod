const express = require('express');
const { submitJob } = require('../services/runpod');
const { getCollection } = require('../services/db');

const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  const jobId = await submitJob(prompt);
  if (!jobId)
    return res.status(500).json({ error: 'Failed to submit job to RunPod' });

  await getCollection().insertOne({
    prompt,
    jobId,
    createdAt: new Date(),
  });

  res.status(200).json({ jobId });
});

module.exports = router;
