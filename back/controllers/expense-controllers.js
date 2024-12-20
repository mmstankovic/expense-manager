const Expense = require('../models/expense')
const httpError = require('../models/httpError')

const getAllExpenses = async (req, res, next) => {
    let expenses
    try {
        expenses = await Expense.find({})
    } catch (err) {
        const error = new httpError('Fetching expenses failed, please try again', 500)
        return next(error)
    }
    res.status(200).json({expenses: expenses.map((item) => item.toObject({getters:true}))})
}
const addNewExpense = async (req, res, next) => {
    const {name, amount, date} = req.body 

    const new_expense = new Expense({
        name,
        amount,
        date
    })
    try {
        await new_expense.save()
    } catch (err) {
        const error = new httpError('Creating new expense failed, please try again', 500)
        return next(error)
    }
    res.status(201).json(new_expense.toObject({getters:true}))
}
const deleteExpense = async (req, res, next) => {
    const expenseId = req.params.expenseId

    let expense
    try {
        expense = await Expense.findById(expenseId)
    } catch (err) {
        const error = new httpError('Deleting expense failed, please try again', 500)
        return next(error)
    }

    if(!expense) {
        const error = new httpError('Could not find expense for provided id', 404)
        return next(error)
    }

    try {
        await expense.deleteOne()
    } catch (err) {
        const error = new httpError('Could not find expense for provided id', 404)
        return next(error)
    }
    res.status(200).json({message: 'The expense has been successfully deleted'})
}

module.exports = {
    getAllExpenses,
    addNewExpense,
    deleteExpense
}