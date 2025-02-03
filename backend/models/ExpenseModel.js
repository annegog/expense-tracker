const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount:{
        type: Number,
        required: true,
    },
    type:{
        type: String,
        default: "Income"
    },
    date:{
        type: Date,
        required: true
    },
    category:{
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    },
    description:{
        type: String,
        required: false,
        maxLength: 1000,
        trim: true
    },
    active:{
        type: Boolean,
        default: true
    }

}, {timestamps: true})

module.exports = mongoose.model('Expense', ExpenseSchema)