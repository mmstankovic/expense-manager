const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Expense', expenseSchema)