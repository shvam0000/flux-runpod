const express = require('express');
const axios = require('axios');
const { getCollection } = require('../services/db');
require('dotenv').config();

const router = express.Router();

router.get('/:jobId', async (req, res) => {
  const { jobId } = req.params;

  try {
    const response = await axios.get(
      `https://api.runpod.ai/v2/${
        process.env.RUNPOD_ENDPOINT.split('/')[4]
      }/status/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.RUNPOD_API_KEY}`,
        },
      }
    );

    const { status, output } = response.data;

    if (status === 'COMPLETED' && output) {
      await getCollection().updateOne(
        { jobId },
        {
          $set: {
            image: output, // This can be base64 or URL
            completedAt: new Date(),
          },
        }
      );
    }

    res.json({ status, output });
  } catch (err) {
    console.error(
      'Error fetching job status:',
      err.response?.data || err.message
    );
    res.status(500).json({ error: 'Failed to fetch job status' });
  }
});

module.exports = router;
