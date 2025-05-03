const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

async function connectDB() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db();
  console.log('Connected to MongoDB');
}

function getCollection() {
  return db.collection('images');
}

module.exports = { connectDB, getCollection };
