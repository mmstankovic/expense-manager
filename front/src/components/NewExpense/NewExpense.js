import Card from "../UI/Card"
import ExpenseForm from "./ExpenseForm"
import classes from './NewExpense.module.css'
import { useState } from "react"

const NewExpense = (props) => {
    const [showForm, setShowForm] = useState(false)

    const showFormHandler = () => {
        setShowForm(true)
    }
    const hideFormHandler = () => {
        setShowForm(false)
    }

    const addNewExpense = (new_expense) => {
        props.onAdd(new_expense)
    }
    return (
        <Card className={classes['new-expense']}>
            {!showForm && <button onClick={showFormHandler}>Add Expense <span>+</span></button>}
            {showForm && <ExpenseForm isLoading={props.isLoading} onAdd={addNewExpense} onHide={hideFormHandler}/>}
        </Card>
    )
}
export default NewExpense