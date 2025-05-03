const axios = require('axios');

async function submitJob(prompt) {
  try {
    const response = await axios.post(
      process.env.RUNPOD_ENDPOINT,
      {
        input: { prompt },
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.RUNPOD_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.id;
  } catch (error) {
    console.error('RunPod error:', error.response?.data || error.message);
    return null;
  }
}

module.exports = { submitJob };
