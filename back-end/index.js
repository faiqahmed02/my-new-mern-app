const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
// Middleware
app.use(cors());
app.use(express.json());

const itemsRouter = require('./routes/itemRoutes');
app.use('/api/items', itemsRouter);

app.use('/api/items/add', itemsRouter);
app.use('/api/items/delete/:id', itemsRouter);






// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('Hello, MERN!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
