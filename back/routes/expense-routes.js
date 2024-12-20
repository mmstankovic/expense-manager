const express = require('express')
const {getAllExpenses, addNewExpense, deleteExpense} = require('../controllers/expense-controllers')

const router = express.Router()

router.get('/', getAllExpenses)
router.post('/new-expense', addNewExpense)
router.delete('/:expenseId', deleteExpense)

module.exports = router