require('dotenv').config();
const express = require('express')
const cors = require('cors')
const body_parser = require('body-parser')
const fs = require('fs')

const port = process.env.PORT || 5000

const app2 = express()
app2.use(cors())
app2.use(body_parser.json())

let EXPENSES = []

app2.get('/api/expenses/', (req, res) => {
    res.json(EXPENSES)
})

app2.post('/api/expenses/new-expense', (req, res) => {
    const new_expense = req.body 
    EXPENSES.unshift(new_expense)
    fs.writeFileSync('./data/expenses.json', JSON.stringify(EXPENSES))
    res.json(EXPENSES)
})

app2.delete('/api/expenses/:expenseId', (req,res) => {
    const expenseId = req.params.expenseId
    const filtered = EXPENSES.filter((expense) => expense.id !== expenseId)
    fs.writeFileSync('./data/expenses.json', JSON.stringify(filtered))
    res.json({message:`Expense ${expenseId} has been successfully deleted.`})
})

app2.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
    const raw_data_string = fs.readFileSync('./data/expenses.json')
    EXPENSES = JSON.parse(raw_data_string)
})