require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./services/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB().then(() => {
  app.use('/generate', require('./routes/generate'));
  app.use('/status', require('./routes/status'));

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
