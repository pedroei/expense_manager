const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Transaction = require('../models/Transaction');

const auth = require('../middleware/auth');

// get user transactions
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      date: -1,
    }); // most recent first
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
});

// create a transaction
router.post(
  '/',
  [auth, check('title', 'Title is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, type, typeBuy, total } = req.body;

    try {
      const newTransaction = new Transaction({
        title,
        type,
        typeBuy,
        total,
        user: req.user.id,
      });

      const transaction = await newTransaction.save();

      res.json(transaction);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, msg: 'Server Error' });
    }
  }
);

// delete transaction
router.delete('/:id', async (req, res) => {
  // check if it is a valid object id
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ success: false, msg: 'Not a valid id' });
  }

  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, msg: 'Transaction not found' });
    }

    // check if user owns transaction - JWT

    await Transaction.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
});

// update transaction
router.put('/:id', async (req, res) => {
  // check if it is a valid object id
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ success: false, msg: 'Not a valid id' });
  }

  const { title, type, expenseType, total } = req.body;

  // create a transaction object with the fields that need update
  const transactionFields = {};

  if (title) transactionFields.title = title;
  if (type) transactionFields.type = type;
  if (expenseType) transactionFields.expenseType = expenseType;
  if (total) transactionFields.total = total;

  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, msg: 'Transaction not found' });
    }

    // check if user owns transaction - JWT

    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: transactionFields },
      { new: true }
    );

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
});

module.exports = router;
