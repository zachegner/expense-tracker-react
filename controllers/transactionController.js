const asyncHandler = require('express-async-handler')

const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {   
    const transactions = await Transaction.find({ user: req.user.id })

    res.status(200).json(transactions)
})

// @desc    Add a transaction
// @route   POST /api/v1/transactions
// @access  Private
const addTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.create({
        text: req.body.text,
        amount: req.body.amount,
        user: req.user.id,
    })
    res.status(200).json(transaction)
})

// @desc    Delete a transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
const deleteTransaction = asyncHandler(async (req, res) => {
    //try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            res.status(400)
            throw new Error('Transaction not found')
        }

        // Check for user
        if(!req.user) {
            res.status(401)
            throw new Error('User not found')
        }

        // Make sure the logged in user matches the transaction user
        if(transaction.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('User not authorized')
        }

        await transaction.remove();

        res.status(200).json({ id: req.params.id })
})


module.exports = {
    getTransactions, 
    addTransaction,
    deleteTransaction
}