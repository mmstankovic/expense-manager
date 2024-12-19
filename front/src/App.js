import Expenses from "./components/Expenses/Expenses";
import { useState, useEffect } from "react";
import NewExpense from "./components/NewExpense/NewExpense";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true)
      setHttpError(null)

      const response = await fetch(process.env.REACT_APP_API_URL)

      if(!response.ok) {
        throw new Error('Fetch data failed!')
      }

      const data = await response.json()


      const loadedExpenses = data.map((expense) => ({...expense, date: new Date(expense.date)}))
      setIsLoading(false)
      setExpenses(loadedExpenses)
    }

    fetchExpenses().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])

  const addNewExpense = (new_expense) => {
    const sendExpenseData = async () => {
      setIsLoading(true)
      setHttpError(null)

      const response = await fetch(`${process.env.REACT_APP_API_URL}/new-expense`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(new_expense)
      })  

      if(!response.ok) {
        throw new Error('Sending data was failed!')
      }

      const data = await response.json()
      const transformedData = data.map((expense) => ({...expense, date: new Date(expense.date)}))

      setIsLoading(false)
      setExpenses(transformedData)
    }

    sendExpenseData().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message)
    })
    
  };

  const deleteExpense = async (expenseId) => {
    setIsLoading(true)
    setHttpError(null)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${expenseId}`, {
        method:'DELETE'
      })

      if(!response.ok) {
        throw new Error('Deleting failed')
      }
      
      const filtered = expenses.filter((item) => item.id !== expenseId)
      setIsLoading(false)
      setExpenses(filtered)
    } catch (err) {
      setIsLoading(false)
      setHttpError(err.message)
    }
  }

  return (
    <div>
      <NewExpense isLoading={isLoading} onAdd={addNewExpense} />
      <Expenses isLoading={isLoading} httpError={httpError} expenses={expenses} onDelete={deleteExpense} />
    </div>
  );
}

export default App;
