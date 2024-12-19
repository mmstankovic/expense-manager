const getAllExpenses = (req, res) => {
    res.json({message:'Get all expenses'})
}
const addNewExpense = (req, res) => {
    res.json({message:'Add new expense'})
}
const deleteExpense = (req, res) => {
    res.send({message:'Expense has been deleted'})
}

module.exports = {
    getAllExpenses,
    addNewExpense,
    deleteExpense
}