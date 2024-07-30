const express = require('express');
const router = express.Router();
const Item = require('../itemModule');

// Route to get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a new item
router.post('/add', async (req, res) => {
  const item = new Item({ name: req.body.name });
  console.log(req.body.name);
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update an item
router.put('/update/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.name = req.body.name;
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete an item
router.delete('/delete/:id', async (req, res) => {
    console.log(req.params.id);
  try {
    const item = await Item.findById(req.params.id);
    console.log(item);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    await item.deleteOne();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
