require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI) // removed useNewUrlParser & useUnifiedTopology
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
