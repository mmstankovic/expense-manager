import Card from '../UI/Card'
import ExpenseItem from './ExpenseItem'
import classes from './Expenses.module.css'
import ExpensesChart from './ExpensesChart'
import ExpensesFilter from './ExpensesFilter'
import { useState } from 'react'

const Expenses = (props) => {
    const [filteredYear, setFilteredYear] = useState('2024')
    const filterByYearHandler = (year) => {
        setFilteredYear(year)
    }  
    
    const filteredExpenses = props.expenses.filter((expense) => expense.date.getFullYear().toString() === filteredYear)
    
    const expenses = filteredExpenses.map((expense) => <ExpenseItem key={expense.id} id={expense.id} name={expense.name} date={expense.date} amount={expense.amount} onDelete={props.onDelete}/>)

    let content 
    if(props.isLoading) {
        content = <div className='centered'>Loading...</div>
    }
    if(props.httpError) {
        content = <div className='centered'>{props.httpError}</div>
    }
   
    if((!props.isLoading && !props.httpError) && (filteredExpenses || filteredExpenses.length > 0)) {
        content = expenses
    }
    if((!props.isLoading && !props.httpError) && (filteredExpenses.length === 0 || !filteredExpenses)) {
        content = <div className='centered'>No expenses for selected year!</div>
    }
    
    return (
        <Card className={classes.expenses}>
            <ExpensesChart expenses={filteredExpenses}/>
            <ExpensesFilter selected={filteredYear} onSelectYear={filterByYearHandler} />
            {content}
        </Card>
    )
}
export default Expenses